const DatabaseAdapter = require('./database');

async function debugDb() {
  const db = new DatabaseAdapter();
  
  try {
    console.log('🔧 Starting database debug...');
    await db.init();
    console.log('✅ Database initialized');

    // Test basic connection
    console.log('📊 Testing basic connection...');
    const testResult = await db.query('SELECT 1 as test');
    console.log('✅ Basic query result:', testResult);

    // Check if tables exist
    console.log('📋 Checking tables...');
    const tables = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('✅ Tables found:', tables.map(t => t.table_name));

    // Check users table
    if (tables.some(t => t.table_name === 'users')) {
      console.log('👥 Checking users table...');
      const users = await db.query('SELECT COUNT(*) as count FROM users');
      console.log('✅ Users count:', users[0]?.count);
      
      if (users[0]?.count > 0) {
        const sampleUsers = await db.query('SELECT id, username, display_name FROM users LIMIT 3');
        console.log('✅ Sample users:', sampleUsers);
      }
    }

    // Check gpus table
    if (tables.some(t => t.table_name === 'gpus')) {
      console.log('🖥️ Checking gpus table...');
      const gpus = await db.query('SELECT COUNT(*) as count FROM gpus');
      console.log('✅ GPUs count:', gpus[0]?.count);
      
      if (gpus[0]?.count > 0) {
        const sampleGpus = await db.query('SELECT id, title, price, seller_id FROM gpus LIMIT 3');
        console.log('✅ Sample GPUs:', sampleGpus);
      }
    }

    console.log('✅ Database debug completed');
  } catch (error) {
    console.error('❌ Database debug failed:', error);
    throw error;
  } finally {
    await db.close();
  }
}

// Run if called directly
if (require.main === module) {
  debugDb().catch(console.error);
}

module.exports = debugDb;
