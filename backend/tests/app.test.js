const request = require('supertest');
const { app } = require('../app');

describe('MVP endpoints', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('robots and sitemap respond', async () => {
    const robots = await request(app).get('/robots.txt');
    expect(robots.status).toBe(200);
    expect(robots.text).toMatch(/Sitemap:/);
    const sitemap = await request(app).get('/sitemap.xml');
    expect(sitemap.status).toBe(200);
    expect(sitemap.text).toMatch(/<urlset/);
  });

  it('search returns results shape', async () => {
    const res = await request(app).get('/api/search?page=1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('results');
    expect(res.body).toHaveProperty('total');
  });
});
