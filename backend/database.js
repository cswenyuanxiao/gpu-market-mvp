// Database abstraction layer supporting both SQLite (dev) and PostgreSQL (production)
const Database = require('better-sqlite3');
const { Pool } = require('pg');
const path = require('path');

class DatabaseAdapter {
  constructor() {
    this.isPostgres = !!process.env.DATABASE_URL;

    if (this.isPostgres) {
      // PostgreSQL for production (Render)
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      });
      console.log('🐘 Using PostgreSQL database');
    } else {
      // SQLite for development
      const dbPath = process.env.DB_PATH || path.join(__dirname, 'data.db');
      this.db = new Database(dbPath);
      this.db.pragma('journal_mode = WAL');
      console.log('🗄️  Using SQLite database:', dbPath);
    }
  }

  async init() {
    if (this.isPostgres) {
      await this.createPostgresTables();
    } else {
      this.createSqliteTables();
    }
  }

  createSqliteTables() {
    // Users table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        display_name TEXT,
        avatar_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // GPUs table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS gpus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        condition TEXT NOT NULL,
        image_path TEXT,
        brand TEXT,
        vram_gb INTEGER,
        seller_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (seller_id) REFERENCES users (id)
      )
    `);

    // GPU images table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS gpu_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        gpu_id INTEGER NOT NULL,
        image_path TEXT NOT NULL,
        thumb_path TEXT,
        sort_order INTEGER DEFAULT 0,
        FOREIGN KEY (gpu_id) REFERENCES gpus (id) ON DELETE CASCADE
      )
    `);

    // Quotes table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        grade TEXT NOT NULL,
        warranty TEXT,
        accessories TEXT,
        expected_price REAL,
        note TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Contact messages table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        consent BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async createPostgresTables() {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Users table
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          display_name VARCHAR(255),
          avatar_path VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // GPUs table
      await client.query(`
        CREATE TABLE IF NOT EXISTS gpus (
          id SERIAL PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          condition VARCHAR(50) NOT NULL,
          image_path VARCHAR(500),
          brand VARCHAR(100),
          vram_gb INTEGER,
          seller_id INTEGER NOT NULL REFERENCES users(id),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // GPU images table
      await client.query(`
        CREATE TABLE IF NOT EXISTS gpu_images (
          id SERIAL PRIMARY KEY,
          gpu_id INTEGER NOT NULL REFERENCES gpus(id) ON DELETE CASCADE,
          image_path VARCHAR(500) NOT NULL,
          thumb_path VARCHAR(500),
          sort_order INTEGER DEFAULT 0
        )
      `);

      // Quotes table
      await client.query(`
        CREATE TABLE IF NOT EXISTS quotes (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          brand VARCHAR(100) NOT NULL,
          model VARCHAR(255) NOT NULL,
          grade VARCHAR(50) NOT NULL,
          warranty TEXT,
          accessories TEXT,
          expected_price DECIMAL(10,2),
          note TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Contact messages table
      await client.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          consent BOOLEAN NOT NULL DEFAULT false,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

    // Run lightweight, idempotent migrations for previously deployed schemas
    await this.applyPostgresMigrations();
  }

  async applyPostgresMigrations() {
    const client = await this.pool.connect();
    try {
      // users: rename password -> password_hash if needed
      const usersCols = await client.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'users'`,
      );
      const userColSet = new Set(usersCols.rows.map((r) => r.column_name));
      if (userColSet.has('password') && !userColSet.has('password_hash')) {
        await client.query(`ALTER TABLE users RENAME COLUMN password TO password_hash`);
      }

      // gpus: add brand, vram_gb if missing
      const gpusCols = await client.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = 'gpus'`,
      );
      const gpuColSet = new Set(gpusCols.rows.map((r) => r.column_name));
      if (!gpuColSet.has('brand')) {
        await client.query(`ALTER TABLE gpus ADD COLUMN brand VARCHAR(100)`);
      }
      if (!gpuColSet.has('vram_gb')) {
        await client.query(`ALTER TABLE gpus ADD COLUMN vram_gb INTEGER`);
      }
    } finally {
      client.release();
    }
  }

  // Unified query methods
  async query(sql, params = []) {
    if (this.isPostgres) {
      const client = await this.pool.connect();
      try {
        // Convert SQLite ? placeholders to PostgreSQL $1, $2, etc.
        let pgSql = sql;
        let paramIndex = 1;
        pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);

        const result = await client.query(pgSql, params);
        return result.rows;
      } finally {
        client.release();
      }
    } else {
      const stmt = this.db.prepare(sql);
      return stmt.all(params);
    }
  }

  async get(sql, params = []) {
    if (this.isPostgres) {
      const rows = await this.query(sql, params);
      return rows[0] || null;
    } else {
      const stmt = this.db.prepare(sql);
      return stmt.get(params) || null;
    }
  }

  async run(sql, params = []) {
    if (this.isPostgres) {
      const client = await this.pool.connect();
      try {
        let pgSql = sql;
        let paramIndex = 1;
        pgSql = pgSql.replace(/\?/g, () => `$${paramIndex++}`);

        // Add RETURNING id for INSERT statements
        if (
          pgSql.toUpperCase().trim().startsWith('INSERT') &&
          !pgSql.toUpperCase().includes('RETURNING')
        ) {
          pgSql += ' RETURNING id';
        }

        const result = await client.query(pgSql, params);
        return {
          lastInsertRowid: result.rows[0]?.id || null,
          changes: result.rowCount || 0,
        };
      } finally {
        client.release();
      }
    } else {
      const stmt = this.db.prepare(sql);
      return stmt.run(params);
    }
  }

  // Compatibility wrapper to mimic better-sqlite3's prepare API
  // so existing code using db.prepare(...).run/get/all continues to work
  prepare(sql) {
    return {
      run: (...params) => this.run(sql, params),
      get: (...params) => this.get(sql, params),
      all: (...params) => this.query(sql, params),
    };
  }

  async close() {
    if (this.isPostgres) {
      await this.pool.end();
    } else {
      this.db.close();
    }
  }
}

module.exports = DatabaseAdapter;
