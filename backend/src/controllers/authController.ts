import { Request, Response, NextFunction } from 'express';
import * as authService from '../../services/authService';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(201).json(result);
  } catch (error: any) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user;
    res.json({ user });
  } catch (error: any) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.userId;
    await authService.logout(userId);
    res.json({ success: true });
  } catch (error: any) {
    next(error);
  }
}