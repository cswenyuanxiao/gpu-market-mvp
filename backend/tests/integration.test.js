const request = require('supertest');
const fs = require('fs');
const path = require('path');
const { app } = require('../app');

function tmpImage(filePath) {
  // Minimal valid PNG header
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  fs.writeFileSync(filePath, sig);
}

describe('Auth + CRUD + Search flow', () => {
  let token;
  let createdId;

  it('registers a user', async () => {
    const res = await request(app).post('/api/register').send({ username: 'tester', password: 'password123', display_name: 'Tester' });
    expect([200, 201, 400]).toContain(res.status); // may exist already if tests rerun
  });

  it('logs in and obtains JWT', async () => {
    const res = await request(app).post('/api/login').send({ username: 'tester', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    token = res.body.token;
  });

  it('creates a listing with image', async () => {
    const p = path.join(__dirname, 'tmp.png');
    tmpImage(p);
    const res = await request(app)
      .post('/api/gpus')
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'Test GPU')
      .field('price', '123')
      .field('condition', 'Used')
      .field('description', 'Desc')
      .attach('image', p, { filename: 'tmp.png', contentType: 'image/png' });
    fs.unlinkSync(p);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test GPU');
    createdId = res.body.id;
  });

  it('search returns the created listing with sort/filters', async () => {
    const res = await request(app).get('/api/search?q=Test&page=1&per=12&sort=price_desc&vram_min=0');
    expect(res.status).toBe(200);
    expect(res.body.results.some(x => x.id === createdId)).toBeTruthy();
  });

  it('update listing (owner)', async () => {
    const res = await request(app)
      .put('/api/gpus/' + createdId)
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'Updated GPU')
      .field('price', '150')
      .field('condition', 'Used')
      .field('description', 'Updated');
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated GPU');
  });

  it('delete listing (owner)', async () => {
    const res = await request(app)
      .delete('/api/gpus/' + createdId)
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('prevents unauthenticated create', async () => {
    const res = await request(app).post('/api/gpus').field('title', 'Nope').field('price', '1').field('condition', 'Used');
    expect([401, 400]).toContain(res.status);
  });

  it('rejects invalid image content', async () => {
    const p = path.join(__dirname, 'bad.bin');
    fs.writeFileSync(p, Buffer.from([0,1,2,3,4]));
    const res = await request(app)
      .post('/api/gpus')
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'Bad Img')
      .field('price', '2')
      .field('condition', 'Used')
      .attach('image', p, { filename: 'bad.png', contentType: 'image/png' });
    fs.unlinkSync(p);
    expect(res.status).toBe(400);
  });
});


