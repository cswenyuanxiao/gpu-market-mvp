const request = require('supertest');
const { app } = require('../app');

describe('Swagger docs availability', () => {
  it('returns 200 on /docs', async () => {
    const res = await request(app).get('/docs');
    expect(res.status).toBe(200);
  });
});
