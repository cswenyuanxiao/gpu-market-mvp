// backend/migrations/add-ecommerce-tables.js
const DatabaseAdapter = require('../database');

async function runMigration() {
  const db = new DatabaseAdapter();
  try {
    console.log('🚀 Starting ecommerce database migration...');
    await db.init();

    // carts
    console.log('📦 Creating carts table...');
    if (db.isPostgres) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS carts (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(user_id)
        )
      `);
    } else {
      await db.query(`
        CREATE TABLE IF NOT EXISTS carts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL UNIQUE,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
    }

    // cart_items
    console.log('🛒 Creating cart_items table...');
    if (db.isPostgres) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS cart_items (
          id SERIAL PRIMARY KEY,
          cart_id INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
          gpu_id INTEGER NOT NULL REFERENCES gpus(id) ON DELETE CASCADE,
          quantity INTEGER NOT NULL DEFAULT 1,
          price DECIMAL(10,2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(cart_id, gpu_id)
        )
      `);
    } else {
      await db.query(`
        CREATE TABLE IF NOT EXISTS cart_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cart_id INTEGER NOT NULL,
          gpu_id INTEGER NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1,
          price REAL NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
          FOREIGN KEY (gpu_id) REFERENCES gpus(id) ON DELETE CASCADE,
          UNIQUE(cart_id, gpu_id)
        )
      `);
    }

    // orders
    console.log('📋 Creating orders table...');
    if (db.isPostgres) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id),
          order_number VARCHAR(50) UNIQUE NOT NULL,
          status VARCHAR(50) NOT NULL DEFAULT 'pending',
          subtotal DECIMAL(10,2) NOT NULL,
          tax_amount DECIMAL(10,2) DEFAULT 0,
          shipping_amount DECIMAL(10,2) DEFAULT 0,
          total_amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'GBP',
          payment_status VARCHAR(50) DEFAULT 'pending',
          payment_method VARCHAR(50),
          payment_id VARCHAR(255),
          shipping_name VARCHAR(255) NOT NULL,
          shipping_email VARCHAR(255) NOT NULL,
          shipping_phone VARCHAR(50),
          shipping_address_line1 VARCHAR(255) NOT NULL,
          shipping_address_line2 VARCHAR(255),
          shipping_city VARCHAR(100) NOT NULL,
          shipping_postcode VARCHAR(20) NOT NULL,
          shipping_country VARCHAR(2) DEFAULT 'GB',
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } else {
      await db.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          order_number TEXT UNIQUE NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          subtotal REAL NOT NULL,
          tax_amount REAL DEFAULT 0,
          shipping_amount REAL DEFAULT 0,
          total_amount REAL NOT NULL,
          currency TEXT DEFAULT 'GBP',
          payment_status TEXT DEFAULT 'pending',
          payment_method TEXT,
          payment_id TEXT,
          shipping_name TEXT NOT NULL,
          shipping_email TEXT NOT NULL,
          shipping_phone TEXT,
          shipping_address_line1 TEXT NOT NULL,
          shipping_address_line2 TEXT,
          shipping_city TEXT NOT NULL,
          shipping_postcode TEXT NOT NULL,
          shipping_country TEXT DEFAULT 'GB',
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);
    }

    // order_items
    console.log('📦 Creating order_items table...');
    if (db.isPostgres) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS order_items (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
          gpu_id INTEGER NOT NULL REFERENCES gpus(id),
          title VARCHAR(500) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          quantity INTEGER NOT NULL,
          subtotal DECIMAL(10,2) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } else {
      await db.query(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER NOT NULL,
          gpu_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL,
          subtotal REAL NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
          FOREIGN KEY (gpu_id) REFERENCES gpus(id)
        )
      `);
    }

    // inventory
    console.log('📊 Creating inventory table...');
    if (db.isPostgres) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS inventory (
          id SERIAL PRIMARY KEY,
          gpu_id INTEGER NOT NULL UNIQUE REFERENCES gpus(id) ON DELETE CASCADE,
          stock_quantity INTEGER NOT NULL DEFAULT 1,
          reserved_quantity INTEGER NOT NULL DEFAULT 0,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } else {
      await db.query(`
        CREATE TABLE IF NOT EXISTS inventory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          gpu_id INTEGER NOT NULL UNIQUE,
          stock_quantity INTEGER NOT NULL DEFAULT 1,
          reserved_quantity INTEGER NOT NULL DEFAULT 0,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (gpu_id) REFERENCES gpus(id) ON DELETE CASCADE
        )
      `);
    }

    // payments
    console.log('💳 Creating payments table...');
    if (db.isPostgres) {
      await db.query(`
        CREATE TABLE IF NOT EXISTS payments (
          id SERIAL PRIMARY KEY,
          order_id INTEGER NOT NULL REFERENCES orders(id),
          payment_id VARCHAR(255) UNIQUE NOT NULL,
          payment_method VARCHAR(50) NOT NULL,
          status VARCHAR(50) NOT NULL,
          amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'GBP',
          gateway_response JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } else {
      await db.query(`
        CREATE TABLE IF NOT EXISTS payments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id INTEGER NOT NULL,
          payment_id TEXT UNIQUE NOT NULL,
          payment_method TEXT NOT NULL,
          status TEXT NOT NULL,
          amount REAL NOT NULL,
          currency TEXT DEFAULT 'GBP',
          gateway_response TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (order_id) REFERENCES orders(id)
        )
      `);
    }

    // indexes
    console.log('🔍 Creating indexes...');
    await db.query('CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_cart_items_gpu_id ON cart_items(gpu_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_inventory_gpu_id ON inventory(gpu_id)');

    // seed inventory for existing GPUs
    console.log('📋 Adding inventory for existing GPUs...');
    const existingGpus = await db.query('SELECT id FROM gpus');
    for (const gpu of existingGpus) {
      if (db.isPostgres) {
        await db.query(
          `INSERT INTO inventory (gpu_id, stock_quantity) VALUES (?, 1) ON CONFLICT (gpu_id) DO NOTHING`,
          [gpu.id],
        );
      } else {
        await db.query(`INSERT OR IGNORE INTO inventory (gpu_id, stock_quantity) VALUES (?, 1)`, [
          gpu.id,
        ]);
      }
    }

    console.log('✅ Ecommerce database migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await db.close();
  }
}

if (require.main === module) {
  runMigration().catch(console.error);
}

module.exports = runMigration;
