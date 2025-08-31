import request from 'supertest';
import app from '../src/app.js';
describe('Dictionary API (integration)', () => {
  it('should add and delete a word', async () => {
    // Add
    const resAdd = await request(app)
      .post('/api/words')
      .send({ word: 'integrationtest', definition: 'test', example: 'example' });
    expect([200,201]).toContain(resAdd.statusCode);
    // Delete
    const resDel = await request(app)
      .delete('/api/words/integrationtest');
    expect(resDel.statusCode).toBe(200);
  });
});
