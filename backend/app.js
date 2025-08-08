require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { z } = require('zod');
const pinoHttp = require('pino-http');
const client = require('prom-client');
const { randomUUID } = require('crypto');
const compression = require('compression');
const sharp = require('sharp');
const swaggerUi = require('swagger-ui-express');

const app = express();
// Helmet with CSP tuned for Bootstrap CDN and inline styles
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", 'https:', "'unsafe-inline'"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        upgradeInsecureRequests: [],
      },
    },
  }),
);
// CORS allow list (comma-separated) or *
const corsEnv = process.env.CORS_ORIGIN || '*';
const allowedOrigins = corsEnv.split(',').map((s) => s.trim());
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin))
        return cb(null, true);
      return cb(new Error('CORS not allowed'));
    },
  }),
);
app.use(compression());
app.use(express.json());
app.use(pinoHttp({ genReqId: (req) => req.headers['x-request-id'] || randomUUID() }));
app.use((req, res, next) => {
  if (req.id) res.set('X-Request-ID', req.id);
  next();
});

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});
register.registerMetric(httpRequestDuration);
const httpResponses = new client.Counter({
  name: 'http_responses_total',
  help: 'HTTP responses by status code',
  labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpResponses);
const httpRequests = new client.Counter({
  name: 'http_requests_total',
  help: 'HTTP requests by route',
  labelNames: ['method', 'route'],
});
register.registerMetric(httpRequests);
const httpResponses4xx = new client.Counter({
  name: 'http_responses_4xx_total',
  help: 'HTTP 4xx responses by route',
  labelNames: ['method', 'route'],
});
register.registerMetric(httpResponses4xx);
const httpResponses5xx = new client.Counter({
  name: 'http_responses_5xx_total',
  help: 'HTTP 5xx responses by route',
  labelNames: ['method', 'route'],
});
register.registerMetric(httpResponses5xx);
const uploadFailures = new client.Counter({
  name: 'upload_failures_total',
  help: 'Failed image uploads due to validation',
});
register.registerMetric(uploadFailures);

function getBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.get('host');
  return `${proto}://${host}`;
}
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on('finish', () => {
    const delta = Number(process.hrtime.bigint() - start) / 1e9;
    const route = (req.route && req.route.path) || req.path || 'unknown';
    httpRequestDuration.observe({ method: req.method, route, status_code: res.statusCode }, delta);
    httpResponses.inc({ method: req.method, route, status_code: res.statusCode });
    httpRequests.inc({ method: req.method, route });
    if (res.statusCode >= 400 && res.statusCode < 500) {
      httpResponses4xx.inc({ method: req.method, route });
    } else if (res.statusCode >= 500) {
      httpResponses5xx.inc({ method: req.method, route });
    }
  });
  next();
});

// Database
const dbPath = process.env.DB_PATH || path.join(__dirname, 'data.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

// Ensure schema exists (idempotent)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password_hash TEXT,
  display_name TEXT,
  avatar_path TEXT
);

CREATE TABLE IF NOT EXISTS gpus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  description TEXT,
  price REAL,
  condition TEXT,
  seller_id INTEGER,
  image_path TEXT,
  created_at TEXT,
  FOREIGN KEY(seller_id) REFERENCES users(id)
);
`);
// indexes
db.exec(`
CREATE INDEX IF NOT EXISTS idx_gpus_created_at ON gpus(created_at);
CREATE INDEX IF NOT EXISTS idx_gpus_price ON gpus(price);
CREATE INDEX IF NOT EXISTS idx_gpus_condition ON gpus(condition);
CREATE INDEX IF NOT EXISTS idx_gpus_seller ON gpus(seller_id);
`);
// additional tables
db.exec(`
CREATE TABLE IF NOT EXISTS gpu_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  gpu_id INTEGER NOT NULL,
  image_path TEXT NOT NULL,
  thumb_path TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT,
  FOREIGN KEY(gpu_id) REFERENCES gpus(id)
);
`);
db.exec(`
CREATE INDEX IF NOT EXISTS idx_gpu_images_gpu ON gpu_images(gpu_id);
`);
// schema migrations
try {
  db.prepare('ALTER TABLE gpus ADD COLUMN brand TEXT').run();
} catch (_) {}
try {
  db.prepare('ALTER TABLE gpus ADD COLUMN vram_gb INTEGER').run();
} catch (_) {}

// uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_')),
});
const maxUpload = Number(process.env.MAX_UPLOAD_MB || 5) * 1024 * 1024;
const allowedMimes = new Set(['image/jpeg', 'image/png', 'image/webp']);
const allowedExts = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const upload = multer({
  storage,
  limits: { fileSize: maxUpload },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    if (!allowedMimes.has(file.mimetype) || !allowedExts.has(ext)) {
      return cb(new Error('Unsupported file type'));
    }
    cb(null, true);
  },
});

function isValidImageMagic(filePath, mime) {
  try {
    const buf = fs.readFileSync(filePath, { encoding: null });
    if (mime === 'image/jpeg') {
      return buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
    }
    if (mime === 'image/png') {
      const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      return sig.every((b, i) => buf[i] === b);
    }
    if (mime === 'image/webp') {
      // RIFF....WEBP
      return (
        buf[0] === 0x52 &&
        buf[1] === 0x49 &&
        buf[2] === 0x46 &&
        buf[3] === 0x46 &&
        buf[8] === 0x57 &&
        buf[9] === 0x45 &&
        buf[10] === 0x42 &&
        buf[11] === 0x50
      );
    }
    return false;
  } catch (e) {
    return false;
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const MAX_IMAGE_PIXELS = Number(process.env.MAX_IMAGE_PIXELS || 25000000); // 25 MP
const IMAGE_MAX_WIDTH = Number(process.env.IMAGE_MAX_WIDTH || 1920);
const THUMB_WIDTH = Number(process.env.THUMB_WIDTH || 400);

async function processAndStoreImage(file, baseUploadsDir) {
  const subdir = path.join(baseUploadsDir, randomUUID());
  if (!fs.existsSync(subdir)) fs.mkdirSync(subdir);
  const baseName =
    Date.now() + '-' + (file.originalname || 'img').replace(/\s+/g, '_').replace(/\.[^.]+$/, '');
  const fullOut = path.join(subdir, baseName + '.webp');
  const thumbOut = path.join(subdir, baseName + '.thumb.webp');
  try {
    const img = sharp(file.path, { failOn: false });
    const meta = await img.metadata();
    if (meta && meta.width && meta.height) {
      const pixels = meta.width * meta.height;
      if (pixels > MAX_IMAGE_PIXELS) {
        try {
          fs.unlinkSync(file.path);
        } catch (_) {}
        const err = new Error('Image too large (pixels)');
        err.code = 'IMAGE_TOO_LARGE';
        throw err;
      }
    }
    await img
      .resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(fullOut);
    await sharp(file.path)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(thumbOut);
    try {
      fs.unlinkSync(file.path);
    } catch (_) {}
    return {
      image_path: `/uploads/${path.basename(subdir)}/${path.basename(fullOut)}`,
      thumb_path: `/uploads/${path.basename(subdir)}/${path.basename(thumbOut)}`,
    };
  } catch (e) {
    // fallback: move original into uuid subdir if sharp fails (e.g., test stub images)
    const fallbackOut = path.join(subdir, path.basename(file.path));
    try {
      fs.renameSync(file.path, fallbackOut);
    } catch (_) {
      /* ignore */
    }
    return {
      image_path: `/uploads/${path.basename(subdir)}/${path.basename(fallbackOut)}`,
      thumb_path: null,
    };
  }
}

function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ error: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'Invalid auth header' });
  const token = parts[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Static uploads (cache)
app.use('/uploads', express.static(uploadDir, { maxAge: '7d', immutable: true }));

// Serve frontend statically when available (for deployment)
const frontendDir = path.join(__dirname, '..', 'frontend');
if (fs.existsSync(frontendDir)) {
  app.use(express.static(frontendDir, { maxAge: '7d', immutable: false }));
  app.get('/', (req, res) => res.sendFile(path.join(frontendDir, 'index.html')));
}

// Rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
});

// OpenAPI (minimal) and Swagger UI
const openApi = {
  openapi: '3.0.3',
  info: { title: 'GPU Market API', version: '1.0.0' },
  servers: [{ url: '' }],
  paths: {
    '/health': { get: { summary: 'Health check', responses: { 200: { description: 'OK' } } } },
    '/api/register': {
      post: {
        summary: 'Register',
        responses: { 201: { description: 'Created' }, 400: { description: 'Invalid' } },
      },
    },
    '/api/login': {
      post: {
        summary: 'Login',
        responses: { 200: { description: 'OK' }, 400: { description: 'Invalid' } },
      },
    },
    '/api/search': {
      get: {
        summary: 'Search listings',
        responses: { 200: { description: 'OK' }, 400: { description: 'Invalid' } },
      },
    },
    '/api/gpus': {
      post: {
        summary: 'Create listing',
        responses: {
          201: { description: 'Created' },
          400: { description: 'Invalid' },
          401: { description: 'Auth' },
        },
      },
    },
    '/api/gpus/{id}': {
      get: {
        summary: 'Get listing',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
      put: {
        summary: 'Update listing',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: {
          200: { description: 'OK' },
          400: { description: 'Invalid' },
          403: { description: 'Forbidden' },
        },
      },
      delete: {
        summary: 'Delete listing',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: {
          200: { description: 'OK' },
          403: { description: 'Forbidden' },
          404: { description: 'Not found' },
        },
      },
    },
    '/api/users/{id}': {
      get: {
        summary: 'Get user',
        parameters: [{ name: 'id', in: 'path', required: true }],
        responses: { 200: { description: 'OK' }, 404: { description: 'Not found' } },
      },
    },
    '/api/users/me/avatar': {
      post: {
        summary: 'Upload avatar',
        responses: {
          200: { description: 'OK' },
          400: { description: 'Invalid' },
          401: { description: 'Auth' },
        },
      },
    },
    '/metrics': {
      get: { summary: 'Prometheus metrics', responses: { 200: { description: 'OK' } } },
    },
  },
};
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApi));

// Validation schemas
const RegisterSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(128),
  display_name: z.string().min(1).max(64).optional(),
});
const LoginSchema = z.object({ username: z.string(), password: z.string() });
const ConditionEnum = z.enum(['New', 'Used']);
const CreateGpuSchema = z.object({
  title: z.string().min(1).max(120),
  description: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  price: z.coerce.number().positive(),
  condition: ConditionEnum,
  brand: z.string().max(50).optional(),
  vram_gb: z.coerce.number().int().nonnegative().max(64).optional(),
});
const SearchSchema = z.object({
  q: z.string().max(200).optional(),
  min: z.coerce.number().nonnegative().optional(),
  max: z.coerce.number().nonnegative().optional(),
  condition: ConditionEnum.optional(),
  page: z.coerce.number().int().min(1).optional(),
  per: z.coerce.number().int().min(1).max(50).optional(),
  brand: z.string().max(50).optional(),
  vram_min: z.coerce.number().int().nonnegative().optional(),
  vram_max: z.coerce.number().int().nonnegative().optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc']).optional(),
});

// Auth: register
app.post('/api/register', authLimiter, (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
  const { username, password, display_name } = parsed.data;
  const hash = bcrypt.hashSync(password, 8);
  try {
    db.prepare('INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)').run(
      username,
      hash,
      display_name || username,
    );
    res.status(201).json({ message: 'ok' });
  } catch (e) {
    res.status(400).json({ error: 'User exists' });
  }
});

// Auth: login
app.post('/api/login', authLimiter, (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid input' });
  const { username, password } = parsed.data;
  const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!row) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, row.password_hash);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign(
    { id: row.id, username: row.username, display_name: row.display_name },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
  res.json({ token });
});

// List GPUs (simple)
app.get('/api/gpus', (req, res) => {
  const rows = db
    .prepare(
      'SELECT gpus.*, users.display_name as seller_name, users.avatar_path as seller_avatar FROM gpus LEFT JOIN users ON gpus.seller_id = users.id ORDER BY created_at DESC',
    )
    .all();
  res.json(rows);
});

app.get('/api/gpus/:id', (req, res) => {
  const row = db
    .prepare(
      'SELECT gpus.*, users.display_name as seller_name, users.avatar_path as seller_avatar FROM gpus LEFT JOIN users ON gpus.seller_id = users.id WHERE gpus.id = ?',
    )
    .get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  const images = db
    .prepare(
      'SELECT image_path, thumb_path, sort_order FROM gpu_images WHERE gpu_id = ? ORDER BY sort_order, id',
    )
    .all(req.params.id);
  res.json({ ...row, images });
});

// Create listing (authenticated, with optional image)
app.post(
  '/api/gpus',
  authenticateToken,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  async (req, res) => {
    const parsed = CreateGpuSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
    const { title, description, price, condition, brand, vram_gb } = parsed.data;
    const seller_id = req.user.id;
    try {
      const files = [];
      if (req.files && req.files['image'] && req.files['image'][0])
        files.push(req.files['image'][0]);
      if (req.files && req.files['images']) files.push(...req.files['images']);
      const processed = [];
      for (const f of files) {
        if (!isValidImageMagic(f.path, f.mimetype)) {
          try {
            fs.unlinkSync(f.path);
          } catch (_) {}
          uploadFailures.inc();
          return res.status(400).json({ error: 'Invalid image content' });
        }
        processed.push(await processAndStoreImage(f, uploadDir));
      }
      const mainImage = processed.length ? processed[0].image_path : null;
      const stmt = db.prepare(
        'INSERT INTO gpus (title, description, price, condition, seller_id, image_path, brand, vram_gb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      );
      const info = stmt.run(
        title,
        description,
        price,
        condition,
        seller_id,
        mainImage,
        brand || null,
        vram_gb ?? null,
        new Date().toISOString(),
      );
      const gpuId = info.lastInsertRowid;
      if (processed.length) {
        const ins = db.prepare(
          'INSERT INTO gpu_images (gpu_id, image_path, thumb_path, sort_order, created_at) VALUES (?, ?, ?, ?, ?)',
        );
        processed.forEach((p, idx) =>
          ins.run(gpuId, p.image_path, p.thumb_path, idx, new Date().toISOString()),
        );
      }
      const newRow = db
        .prepare(
          'SELECT gpus.*, users.display_name as seller_name, users.avatar_path as seller_avatar FROM gpus LEFT JOIN users ON gpus.seller_id = users.id WHERE gpus.id = ?',
        )
        .get(gpuId);
      res.status(201).json(newRow);
    } catch (e) {
      if (e && e.code === 'IMAGE_TOO_LARGE')
        return res.status(400).json({ error: 'Image exceeds pixel limit' });
      res.status(500).json({ error: 'Server error' });
    }
  },
);

// Update listing (owner only)
app.put(
  '/api/gpus/:id',
  authenticateToken,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  async (req, res) => {
    const id = req.params.id;
    const row = db.prepare('SELECT * FROM gpus WHERE id = ?').get(id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    if (row.seller_id !== req.user.id) return res.status(403).json({ error: 'Not owner' });
    const parsed = CreateGpuSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
    const { title, description, price, condition, brand, vram_gb } = parsed.data;
    let image_path = row.image_path;
    try {
      const files = [];
      if (req.files && req.files['image'] && req.files['image'][0])
        files.push(req.files['image'][0]);
      if (req.files && req.files['images']) files.push(...req.files['images']);
      const processed = [];
      for (const f of files) {
        if (!isValidImageMagic(f.path, f.mimetype)) {
          try {
            fs.unlinkSync(f.path);
          } catch (_) {}
          uploadFailures.inc();
          return res.status(400).json({ error: 'Invalid image content' });
        }
        processed.push(await processAndStoreImage(f, uploadDir));
      }
      if (processed.length) image_path = processed[0].image_path;
      db.prepare(
        'UPDATE gpus SET title = ?, description = ?, price = ?, condition = ?, image_path = ?, brand = ?, vram_gb = ? WHERE id = ?',
      ).run(title, description, price, condition, image_path, brand || null, vram_gb ?? null, id);
      if (processed.length) {
        const ins = db.prepare(
          'INSERT INTO gpu_images (gpu_id, image_path, thumb_path, sort_order, created_at) VALUES (?, ?, ?, ?, ?)',
        );
        processed.forEach((p, idx) =>
          ins.run(id, p.image_path, p.thumb_path, idx, new Date().toISOString()),
        );
      }
      const updated = db
        .prepare(
          'SELECT gpus.*, users.display_name as seller_name, users.avatar_path as seller_avatar FROM gpus LEFT JOIN users ON gpus.seller_id = users.id WHERE gpus.id = ?',
        )
        .get(id);
      res.json(updated);
    } catch (e) {
      if (e && e.code === 'IMAGE_TOO_LARGE')
        return res.status(400).json({ error: 'Image exceeds pixel limit' });
      res.status(500).json({ error: 'Server error' });
    }
  },
);

// Delete listing (owner only)
app.delete('/api/gpus/:id', authenticateToken, (req, res) => {
  const id = req.params.id;
  const row = db.prepare('SELECT * FROM gpus WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  if (row.seller_id !== req.user.id) return res.status(403).json({ error: 'Not owner' });
  // best-effort delete associated images first to avoid FK issues
  try {
    db.prepare('DELETE FROM gpu_images WHERE gpu_id = ?').run(id);
  } catch (_) {}
  try {
    db.prepare('DELETE FROM gpus WHERE id = ?').run(id);
  } catch (_) {}
  res.json({ ok: true });
});

// Search / pagination / filters
app.get('/api/search', (req, res) => {
  const parsed = SearchSchema.safeParse(req.query);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid query' });
  const {
    q = '',
    min = null,
    max = null,
    condition = null,
    page = 1,
    per = 12,
    brand = undefined,
    vram_min = undefined,
    vram_max = undefined,
    sort = 'newest',
  } = parsed.data;

  let where = 'WHERE 1=1';
  const params = [];
  if (q) {
    where += ' AND (gpus.title LIKE ? OR gpus.description LIKE ?)';
    params.push('%' + q + '%', '%' + q + '%');
  }
  if (condition) {
    where += ' AND gpus.condition = ?';
    params.push(condition);
  }
  if (min !== null) {
    where += ' AND gpus.price >= ?';
    params.push(min);
  }
  if (max !== null) {
    where += ' AND gpus.price <= ?';
    params.push(max);
  }
  if (brand) {
    where += ' AND gpus.brand = ?';
    params.push(brand);
  }
  if (vram_min !== undefined) {
    where += ' AND COALESCE(gpus.vram_gb,0) >= ?';
    params.push(vram_min);
  }
  if (vram_max !== undefined) {
    where += ' AND COALESCE(gpus.vram_gb,0) <= ?';
    params.push(vram_max);
  }

  const total = db.prepare('SELECT COUNT(*) as c FROM gpus ' + where).get(...params).c;
  const offset = (page - 1) * per;
  let order = 'created_at DESC';
  if (sort === 'price_asc') order = 'price ASC';
  if (sort === 'price_desc') order = 'price DESC';
  const rows = db
    .prepare(
      'SELECT gpus.*, users.display_name as seller_name, users.avatar_path as seller_avatar FROM gpus LEFT JOIN users ON gpus.seller_id = users.id ' +
        where +
        ` ORDER BY ${order} LIMIT ? OFFSET ?`,
    )
    .all(...params, per, offset);
  res.json({ total, page, per, results: rows });
});

// User profile & avatar upload
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const row = db
    .prepare('SELECT id, username, display_name, avatar_path FROM users WHERE id = ?')
    .get(id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

app.post('/api/users/me/avatar', authenticateToken, upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Missing file' });
  if (!isValidImageMagic(req.file.path, req.file.mimetype)) {
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {}
    uploadFailures.inc();
    return res.status(400).json({ error: 'Invalid image content' });
  }
  const avatar_path = `/uploads/${path.basename(req.file.path)}`;
  db.prepare('UPDATE users SET avatar_path = ? WHERE id = ?').run(avatar_path, req.user.id);
  res.json({ avatar_path });
});

// Health & Metrics
app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// SEO: robots.txt and sitemap.xml
app.get('/robots.txt', (req, res) => {
  const base = getBaseUrl(req);
  res.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const base = getBaseUrl(req);
  // Include homepage and latest listings (up to 50)
  const urls = [];
  urls.push({ loc: `${base}/`, lastmod: new Date().toISOString() });
  try {
    const rows = db
      .prepare('SELECT id, created_at FROM gpus ORDER BY datetime(created_at) DESC LIMIT 50')
      .all();
    for (const r of rows) {
      urls.push({ loc: `${base}/?id=${r.id}`, lastmod: r.created_at || new Date().toISOString() });
    }
  } catch (e) {
    // ignore
  }
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map((u) => `\n  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('') +
    `\n</urlset>`;
  res.type('application/xml').send(xml);
});

// My listings endpoint
app.get('/api/my/gpus', authenticateToken, (req, res) => {
  const rows = db
    .prepare(
      'SELECT gpus.*, users.display_name as seller_name, users.avatar_path as seller_avatar FROM gpus LEFT JOIN users ON gpus.seller_id = users.id WHERE seller_id = ? ORDER BY created_at DESC',
    )
    .all(req.user.id);
  res.json(rows);
});

module.exports = { app };
