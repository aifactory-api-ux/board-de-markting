import { app } from '../src/app';
import request from 'supertest';

jest.mock('../../shared/config', () => ({
  config: {
    jwt: {
      secret: 'test-secret-key-for-testing',
      expiresIn: '7d',
    },
    cors: { origin: 'http://localhost:5173' },
    backend: { port: 4000, nodeEnv: 'test' },
    database: { url: '' },
    s3: { bucket: '', region: 'us-east-1', accessKeyId: '', secretAccessKey: '' },
    frontend: { url: 'http://localhost:5173' },
    admin: { email: 'admin@test.com', password: 'password' },
  },
}));

describe('app routes', () => {
  describe('GET /health', () => {
    it('should return 200 with status ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 'ok');
      expect(res.body).toHaveProperty('timestamp');
    });
  });

  describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/api/unknown-route');
      expect(res.status).toBe(404);
    });
  });
});