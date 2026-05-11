import jwt from 'jsonwebtoken';
import { config } from '../shared/config';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'] });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, config.jwt.secret) as TokenPayload;
}