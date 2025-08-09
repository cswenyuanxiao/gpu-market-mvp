const DatabaseAdapter = require('./database');
const bcrypt = require('bcryptjs');

async function forceSeed() {
  const db = new DatabaseAdapter();
  
  try {
    console.log('🔧 Starting force seed...');
    await db.init();
    console.log('✅ Database initialized');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.run('DELETE FROM gpu_images');
    await db.run('DELETE FROM gpus');
    await db.run('DELETE FROM users');
    console.log('✅ Data cleared');

    // Create test users
    console.log('👥 Creating test users...');
    const testUsers = [
      { username: 'alice', password: 'password', display_name: 'Alice' },
      { username: 'bob', password: 'password', display_name: 'Bob' },
      { username: 'charlie', password: 'password', display_name: 'Charlie' },
    ];

    for (const user of testUsers) {
      const passwordHash = bcrypt.hashSync(user.password, 8);
      await db.run(
        'INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)',
        [user.username, passwordHash, user.display_name]
      );
      console.log(`✅ Created user: ${user.username}`);
    }

    // Get user IDs
    const users = await db.query('SELECT id, username FROM users');
    console.log('✅ Users created:', users.length);

    // Create 10 GPU samples
    console.log('🖥️ Creating GPU samples...');
    const gpuSamples = [
      {
        title: 'NVIDIA RTX 4090 Founders Edition',
        description: 'Brand new, factory sealed RTX 4090. The most powerful gaming GPU available.',
        price: 1599.99,
        condition: 'New',
        brand: 'NVIDIA',
        vram_gb: 24,
        seller_id: users[0]?.id
      },
      {
        title: 'AMD Radeon RX 7900 XTX',
        description: 'Excellent condition, used for 3 months. No mining, gaming only.',
        price: 899.99,
        condition: 'Used',
        brand: 'AMD',
        vram_gb: 24,
        seller_id: users[1]?.id
      },
      {
        title: 'NVIDIA RTX 4080 Super',
        description: 'Like new condition, comes with original box and warranty.',
        price: 999.99,
        condition: 'Used',
        brand: 'NVIDIA',
        vram_gb: 16,
        seller_id: users[2]?.id
      },
      {
        title: 'AMD Radeon RX 7800 XT',
        description: 'Good condition, minor cosmetic wear. Great for 1440p gaming.',
        price: 499.99,
        condition: 'Used',
        brand: 'AMD',
        vram_gb: 16,
        seller_id: users[0]?.id
      },
      {
        title: 'NVIDIA RTX 4070 Ti',
        description: 'New in box, never opened. Perfect for 1440p and 4K gaming.',
        price: 799.99,
        condition: 'New',
        brand: 'NVIDIA',
        vram_gb: 12,
        seller_id: users[1]?.id
      },
      {
        title: 'AMD Radeon RX 7700 XT',
        description: 'Used for 6 months, excellent performance. No issues.',
        price: 399.99,
        condition: 'Used',
        brand: 'AMD',
        vram_gb: 12,
        seller_id: users[2]?.id
      },
      {
        title: 'NVIDIA RTX 4060 Ti',
        description: 'Brand new, perfect for 1080p and 1440p gaming.',
        price: 399.99,
        condition: 'New',
        brand: 'NVIDIA',
        vram_gb: 8,
        seller_id: users[0]?.id
      },
      {
        title: 'AMD Radeon RX 7600',
        description: 'Good condition, great value for 1080p gaming.',
        price: 249.99,
        condition: 'Used',
        brand: 'AMD',
        vram_gb: 8,
        seller_id: users[1]?.id
      },
      {
        title: 'NVIDIA RTX 3090 Ti',
        description: 'Used for mining, but well maintained. Still under warranty.',
        price: 699.99,
        condition: 'Used',
        brand: 'NVIDIA',
        vram_gb: 24,
        seller_id: users[2]?.id
      },
      {
        title: 'AMD Radeon RX 6950 XT',
        description: 'Excellent condition, no mining history. Perfect for 4K gaming.',
        price: 599.99,
        condition: 'Used',
        brand: 'AMD',
        vram_gb: 16,
        seller_id: users[0]?.id
      }
    ];

    // Insert GPU samples
    for (const gpu of gpuSamples) {
      if (gpu.seller_id) {
        await db.run(
          'INSERT INTO gpus (title, description, price, condition, brand, vram_gb, seller_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [
            gpu.title,
            gpu.description,
            gpu.price,
            gpu.condition,
            gpu.brand,
            gpu.vram_gb,
            gpu.seller_id,
            new Date().toISOString()
          ]
        );
        console.log(`✅ Created GPU: ${gpu.title}`);
      }
    }

    // Verify data
    const finalUsers = await db.query('SELECT COUNT(*) as count FROM users');
    const finalGpus = await db.query('SELECT COUNT(*) as count FROM gpus');
    
    console.log('✅ Final counts:');
    console.log(`   Users: ${finalUsers[0]?.count}`);
    console.log(`   GPUs: ${finalGpus[0]?.count}`);

    console.log('✅ Force seed completed successfully');
  } catch (error) {
    console.error('❌ Force seed failed:', error);
    throw error;
  } finally {
    await db.close();
  }
}

// Run if called directly
if (require.main === module) {
  forceSeed().catch(console.error);
}

module.exports = forceSeed;
