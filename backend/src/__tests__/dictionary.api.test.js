import request from 'supertest';
import app from '../app.js';
describe('Dictionary API', () => {
  it('GET /api/words returns array', async () => {
    const res = await request(app).get('/api/words');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  it('POST /api/words validates input', async () => {
    const res = await request(app).post('/api/words').send({ definition: 'test' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/required/i);
  });
});
