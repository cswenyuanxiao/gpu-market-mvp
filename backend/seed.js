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
  created_at TEXT,
  FOREIGN KEY(seller_id) REFERENCES users(id)
);
`);

const insertUser = db.prepare('INSERT OR IGNORE INTO users (username, password_hash, display_name) VALUES (?, ?, ?)');
const pwHash = (pw) => bcrypt.hashSync(pw, 8);
insertUser.run('alice', pwHash('password'), 'Alice');
insertUser.run('bob', pwHash('password'), 'Bob');
insertUser.run('charlie', pwHash('password'), 'Charlie');

const getUserId = db.prepare('SELECT id FROM users WHERE username = ?');
const aliceId = getUserId.get('alice').id;
const bobId = getUserId.get('bob').id;
const charlieId = getUserId.get('charlie').id;

const insert = db.prepare('INSERT INTO gpus (title, description, price, condition, seller_id, image_path, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)');
insert.run('NVIDIA RTX 3080 Ti', 'Good condition, minor cosmetic wear', 650, 'Used', aliceId, null, new Date().toISOString());
insert.run('AMD Radeon RX 6800 XT', 'Like new, low hours', 600, 'Used', bobId, null, new Date().toISOString());
insert.run('NVIDIA RTX 4090', 'Factory sealed', 2000, 'New', charlieId, null, new Date().toISOString());

console.log('Seeded database at', path.join(__dirname, 'data.db'));


