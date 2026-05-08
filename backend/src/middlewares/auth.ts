import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return next(new Error('Not authenticated'));
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
      return next(new Error('Insufficient permissions'));
    }

    next();
  };
}