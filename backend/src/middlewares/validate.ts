import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function validate(req: Request, _res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err: any = new Error('Validation failed');
    err.status = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
}