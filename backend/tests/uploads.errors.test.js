const request = require('supertest');
const path = require('path');
const fs = require('fs');
const { app } = require('../app');

describe('Uploads error codes', () => {
  let token;
  beforeAll(async () => {
    await request(app)
      .post('/api/register')
      .send({ username: 'up1', password: 'p@ssw0rd', display_name: 'UP' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'up1', password: 'p@ssw0rd' });
    token = login.body.token;
  });

  it('avatar upload returns MISSING_FILE', async () => {
    const res = await request(app)
      .post('/api/users/me/avatar')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('MISSING_FILE');
  });

  it('rejects invalid image content with code', async () => {
    const tmp = path.join(__dirname, 'tmp.bin');
    fs.writeFileSync(tmp, Buffer.from([0x00, 0x01, 0x02, 0x03]));
    const res = await request(app)
      .post('/api/users/me/avatar')
      .set('Authorization', 'Bearer ' + token)
      .attach('avatar', tmp);
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('INVALID_IMAGE_CONTENT');
    fs.unlinkSync(tmp);
  });
});
