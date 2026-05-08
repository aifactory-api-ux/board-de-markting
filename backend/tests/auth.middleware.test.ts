import { Request, Response, NextFunction } from 'express';

jest.mock('../../shared/config', () => ({
  config: {
    jwt: {
      secret: 'test-secret-key-for-testing',
      expiresIn: '7d',
    },
    cors: { origin: 'http://localhost:5173' },
  },
}));

const mockRequest = (headers: Record<string, string> = {}) => {
  return {
    headers,
  } as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {};
  return res;
};

const mockNext: NextFunction = jest.fn();

describe('auth middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticate', () => {
    it('should call next with error when no authorization header', () => {
      jest.resetModules();
      const { authenticate } = require('../src/middlewares/auth');
      const req = mockRequest({});
      const res = mockResponse();
      authenticate(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with error when authorization header does not start with Bearer', () => {
      jest.resetModules();
      const { authenticate } = require('../src/middlewares/auth');
      const req = mockRequest({ authorization: 'Basic abc123' });
      const res = mockResponse();
      authenticate(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with error for invalid token', () => {
      jest.resetModules();
      const { authenticate } = require('../src/middlewares/auth');
      const req = mockRequest({ authorization: 'Bearer invalid-token' });
      const res = mockResponse();
      authenticate(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('authorize', () => {
    it('should call next with error when user not authenticated', () => {
      jest.resetModules();
      const { authorize } = require('../src/middlewares/auth');
      const req = mockRequest({}) as Request;
      const res = mockResponse();
      const middleware = authorize('admin');
      middleware(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with error when user role not authorized', () => {
      jest.resetModules();
      const { authorize } = require('../src/middlewares/auth');
      const req = mockRequest({}) as Request;
      (req as any).user = { userId: '123', email: 'test@example.com', role: 'viewer' };
      const res = mockResponse();
      const middleware = authorize('admin');
      middleware(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next without error when user is authorized', () => {
      jest.resetModules();
      const { authorize } = require('../src/middlewares/auth');
      const req = mockRequest({}) as Request;
      (req as any).user = { userId: '123', email: 'test@example.com', role: 'admin' };
      const res = mockResponse();
      const middleware = authorize('admin');
      middleware(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });

    it('should call next without error when no roles required', () => {
      jest.resetModules();
      const { authorize } = require('../src/middlewares/auth');
      const req = mockRequest({}) as Request;
      (req as any).user = { userId: '123', email: 'test@example.com', role: 'viewer' };
      const res = mockResponse();
      const middleware = authorize();
      middleware(req, res as Response, mockNext);
      expect(mockNext).toHaveBeenCalledWith();
    });
  });
});