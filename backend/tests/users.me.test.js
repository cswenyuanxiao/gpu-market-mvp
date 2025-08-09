const request = require('supertest');
const { app } = require('../app');

describe('GET/PATCH /api/users/me', () => {
  // helper removed (unused)

  it('requires auth for GET', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.status).toBe(401);
  });

  it('returns current user for GET when authorized', async () => {
    // Seed a user via register
    await request(app)
      .post('/api/register')
      .send({ username: 'u1', password: 'p@ssw0rd', display_name: 'U1' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'u1', password: 'p@ssw0rd' });
    const token = login.body.token;
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer ' + token);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('u1');
  });

  it('validates display_name on PATCH and returns refreshed token', async () => {
    await request(app)
      .post('/api/register')
      .send({ username: 'u2', password: 'p@ssw0rd', display_name: 'U2' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'u2', password: 'p@ssw0rd' });
    const token = login.body.token;
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', 'Bearer ' + token)
      .send({ display_name: 'New Name' });
    expect(res.status).toBe(200);
    expect(res.body.user.display_name).toBe('New Name');
    expect(typeof res.body.token).toBe('string');
  });

  it('rejects invalid PATCH payload', async () => {
    await request(app)
      .post('/api/register')
      .send({ username: 'u3', password: 'p@ssw0rd', display_name: 'U3' });
    const login = await request(app)
      .post('/api/login')
      .send({ username: 'u3', password: 'p@ssw0rd' });
    const token = login.body.token;
    const res = await request(app)
      .patch('/api/users/me')
      .set('Authorization', 'Bearer ' + token)
      .send({ display_name: '' });
    expect(res.status).toBe(400);
  });
});
