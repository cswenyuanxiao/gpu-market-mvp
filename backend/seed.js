const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'data.db'));

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
  brand TEXT,
  vram_gb INTEGER,
  created_at TEXT,
  FOREIGN KEY(seller_id) REFERENCES users(id)
);
`);

const insertUser = db.prepare(
  'INSERT OR IGNORE INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
);
const pwHash = (pw) => bcrypt.hashSync(pw, 8);
insertUser.run('alice', pwHash('password'), 'Alice');
insertUser.run('bob', pwHash('password'), 'Bob');
insertUser.run('charlie', pwHash('password'), 'Charlie');

const getUserId = db.prepare('SELECT id FROM users WHERE username = ?');
const aliceId = getUserId.get('alice').id;
const bobId = getUserId.get('bob').id;
const charlieId = getUserId.get('charlie').id;

const insert = db.prepare(
  'INSERT INTO gpus (title, description, price, condition, seller_id, image_path, brand, vram_gb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
);
const now = Date.now();
const items = [
  ['NVIDIA RTX 3080 Ti', 'Good condition, minor cosmetic wear', 650, 'Used', aliceId, 'NVIDIA', 12],
  ['AMD Radeon RX 6800 XT', 'Like new, low hours', 600, 'Used', bobId, 'AMD', 16],
  ['NVIDIA RTX 4090', 'Factory sealed', 2000, 'New', charlieId, 'NVIDIA', 24],
];
// add many filler items to enable scroll testing
for (let i = 0; i < 40; i++) {
  const seller = i % 3 === 0 ? aliceId : i % 3 === 1 ? bobId : charlieId;
  const brand = i % 3 === 0 ? 'NVIDIA' : i % 3 === 1 ? 'AMD' : 'Intel';
  const vram = [4, 6, 8, 12, 16, 24][i % 6];
  items.push([
    `Demo GPU ${i + 1}`,
    `This is a demo listing used for long-page scroll testing. Index ${i + 1}.`,
    100 + (i % 10) * 25,
    i % 2 === 0 ? 'Used' : 'New',
    seller,
    brand,
    vram,
  ]);
}
for (const [title, desc, price, cond, uid, brand, vram] of items) {
  insert.run(
    title,
    desc,
    price,
    cond,
    uid,
    null,
    brand,
    vram,
    new Date(now - Math.floor(Math.random() * 1e9)).toISOString(),
  );
}

console.log('Seeded database at', path.join(__dirname, 'data.db'));
