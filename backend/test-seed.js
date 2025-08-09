const DatabaseAdapter = require('./database');
const bcrypt = require('bcryptjs');

async function testSeed() {
  const db = new DatabaseAdapter();
  
  try {
    console.log('🔧 Starting test seed...');
    await db.init();
    console.log('✅ Database initialized');

    // Test database connection
    const testQuery = await db.query('SELECT 1 as test');
    console.log('✅ Database connection test:', testQuery);

    // Check if users table exists
    const users = await db.query('SELECT COUNT(*) as count FROM users');
    console.log('✅ Users count:', users[0]?.count);

    // Check if gpus table exists
    const gpus = await db.query('SELECT COUNT(*) as count FROM gpus');
    console.log('✅ GPUs count:', gpus[0]?.count);

    // Create a test user if none exist
    if (users[0]?.count === 0) {
      console.log('📝 Creating test user...');
      const passwordHash = bcrypt.hashSync('password', 8);
      await db.run(
        'INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
        ['testuser', passwordHash, 'Test User']
      );
      console.log('✅ Test user created');
    }

    // Get user ID
    const user = await db.get('SELECT id FROM users LIMIT 1');
    console.log('✅ Found user:', user);

    if (user && gpus[0]?.count === 0) {
      console.log('📝 Creating test GPU...');
      await db.run(
        'INSERT INTO gpus (title, description, price, condition, brand, vram_gb, seller_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          'NVIDIA RTX 4090 Founders Edition',
          'Brand new, factory sealed RTX 4090. The most powerful gaming GPU available.',
          1599.99,
          'New',
          'NVIDIA',
          24,
          user.id,
          new Date().toISOString()
        ]
      );
      console.log('✅ Test GPU created');
    }

    // Final count check
    const finalGpus = await db.query('SELECT COUNT(*) as count FROM gpus');
    console.log('✅ Final GPUs count:', finalGpus[0]?.count);

    console.log('✅ Test seed completed successfully');
  } catch (error) {
    console.error('❌ Test seed failed:', error);
    throw error;
  } finally {
    await db.close();
  }
}

// Run if called directly
if (require.main === module) {
  testSeed().catch(console.error);
}

module.exports = testSeed;
