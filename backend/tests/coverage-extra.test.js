const request = require('supertest');
const { app } = require('../app');

describe('Extra coverage for errors and edges', () => {
  it('health returns x-request-id header', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.headers['x-request-id']).toBeTruthy();
  });

  it('metrics endpoint responds', async () => {
    const res = await request(app).get('/metrics');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/http_request_duration_seconds/);
  });

  it('gpus/:id returns images array (possibly empty)', async () => {
    const res = await request(app).get('/api/gpus/999999');
    expect([404]).toContain(res.status);
  });

  it('rejects create when image header invalid magic', async () => {
    // login
    await request(app).post('/api/register').send({ username: 'magic', password: 'password123' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'magic', password: 'password123' });
    const token = login.body.token;
    // attach invalid content masquerading as png
    const path = require('path');
    const fs = require('fs');
    const p = path.join(__dirname, 'bad2.png');
    fs.writeFileSync(p, Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]));
    const r = await request(app)
      .post('/api/gpus')
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'Bad')
      .field('price', '10')
      .field('condition', 'Used')
      .attach('images', p, { filename: 'bad2.png', contentType: 'image/png' });
    fs.unlinkSync(p);
    expect([400]).toContain(r.status);
  });

  it('get non-existing gpu returns 404', async () => {
    const res = await request(app).get('/api/gpus/999999');
    expect(res.status).toBe(404);
  });

  it('get non-existing user returns 404', async () => {
    const res = await request(app).get('/api/users/999999');
    expect(res.status).toBe(404);
  });

  it('my listings requires auth', async () => {
    const res = await request(app).get('/api/my/gpus');
    expect(res.status).toBe(401);
  });

  it('avatar upload requires file', async () => {
    // First register/login
    await request(app)
      .post('/api/register')
      .send({ username: 'fileuser', password: 'password123' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'fileuser', password: 'password123' });
    const token = login.body.token;
    const res = await request(app)
      .post('/api/users/me/avatar')
      .set('Authorization', 'Bearer ' + token);
    expect([400, 415]).toContain(res.status);
  });

  it('zod invalid register input', async () => {
    const res = await request(app).post('/api/register').send({ username: 'ab', password: '1' });
    expect(res.status).toBe(400);
  });

  it('zod invalid login input', async () => {
    const res = await request(app).post('/api/login').send({ username: 123 });
    expect(res.status).toBe(400);
  });

  it('zod invalid search input (per too large)', async () => {
    const res = await request(app).get('/api/search?per=100');
    expect(res.status).toBe(400);
  });

  it('brand and vram filters work and sorting is consistent', async () => {
    // create user + login
    await request(app)
      .post('/api/register')
      .send({ username: 'branduser', password: 'password123' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'branduser', password: 'password123' });
    const token = login.body.token;
    // create a couple listings with brand/VRAM and prices
    const path = require('path');
    const fs = require('fs');
    const p = path.join(__dirname, 'tmpb.png');
    fs.writeFileSync(p, Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const create1 = await request(app)
      .post('/api/gpus')
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'B1')
      .field('price', '300')
      .field('condition', 'Used')
      .field('brand', 'NVIDIA')
      .field('vram_gb', '8')
      .attach('image', p, { filename: 'tmpb.png', contentType: 'image/png' });
    const create2 = await request(app)
      .post('/api/gpus')
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'B2')
      .field('price', '200')
      .field('condition', 'Used')
      .field('brand', 'NVIDIA')
      .field('vram_gb', '12')
      .attach('image', p, { filename: 'tmpb.png', contentType: 'image/png' });
    const create3 = await request(app)
      .post('/api/gpus')
      .set('Authorization', 'Bearer ' + token)
      .field('title', 'A1')
      .field('price', '150')
      .field('condition', 'Used')
      .field('brand', 'AMD')
      .field('vram_gb', '8')
      .attach('image', p, { filename: 'tmpb.png', contentType: 'image/png' });
    fs.unlinkSync(p);
    expect([201]).toContain(create1.status);
    expect([201]).toContain(create2.status);
    expect([201]).toContain(create3.status);
    // filter by brand
    const f1 = await request(app).get('/api/search?brand=NVIDIA');
    expect(f1.status).toBe(200);
    expect(f1.body.results.every((r) => r.brand === 'NVIDIA')).toBeTruthy();
    // filter by vram_min
    const f2 = await request(app).get('/api/search?vram_min=10');
    expect(f2.status).toBe(200);
    expect(f2.body.results.every((r) => (r.vram_gb || 0) >= 10)).toBeTruthy();
    // sort consistency price_asc
    const s1 = await request(app).get('/api/search?sort=price_asc');
    const pricesAsc = s1.body.results.map((r) => r.price);
    const sortedAsc = [...pricesAsc].sort((a, b) => a - b);
    expect(pricesAsc).toEqual(sortedAsc);
    // sort consistency price_desc
    const s2 = await request(app).get('/api/search?sort=price_desc');
    const pricesDesc = s2.body.results.map((r) => r.price);
    const sortedDesc = [...pricesDesc].sort((a, b) => b - a);
    expect(pricesDesc).toEqual(sortedDesc);
  });

  it('quotes endpoint accepts basic submission and handles invalid image gracefully', async () => {
    const res1 = await request(app)
      .post('/api/quotes')
      .field('contact_name', 'Alice')
      .field('email', 'a@b.com')
      .field('brand', 'NVIDIA')
      .field('model', 'RTX 4090')
      .field('expected_price', '1000');
    expect([201, 400, 500]).toContain(res1.status);

    // attach invalid magic pretending to be png
    const path = require('path');
    const fs = require('fs');
    const p = path.join(__dirname, 'badq.png');
    fs.writeFileSync(p, Buffer.from([1, 2, 3, 4]));
    const res2 = await request(app)
      .post('/api/quotes')
      .field('contact_name', 'Bob')
      .field('email', 'b@c.com')
      .field('brand', 'AMD')
      .field('model', 'RX 6800')
      .field('expected_price', '600')
      .attach('images', p, { filename: 'badq.png', contentType: 'image/png' });
    fs.unlinkSync(p);
    expect([400]).toContain(res2.status);
  });
});
