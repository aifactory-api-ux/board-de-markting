import { signToken, verifyToken, TokenPayload } from '../src/utils/jwt';

const TEST_SECRET = 'test-secret-key-for-testing';
const originalSecret = process.env.JWT_SECRET;

process.env.JWT_SECRET = TEST_SECRET;

jest.mock('../../shared/config', () => ({
  config: {
    jwt: {
      secret: 'test-secret-key-for-testing',
      expiresIn: '7d',
    },
    cors: { origin: 'http://localhost:5173' },
  },
}));

describe('jwt utils', () => {
  afterAll(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  describe('signToken', () => {
    it('should sign a token with payload', () => {
      const payload: TokenPayload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'editor',
      };
      const token = signToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const payload: TokenPayload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'editor',
      };
      const token = signToken(payload);
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(payload.userId);
      expect(decoded.email).toBe(payload.email);
      expect(decoded.role).toBe(payload.role);
    });

    it('should throw error for invalid token', () => {
      expect(() => verifyToken('invalid-token')).toThrow();
    });
  });
});