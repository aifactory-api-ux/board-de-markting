import { Request, Response, NextFunction } from 'express';
import * as notificationService from '../../services/notificationService';

export async function getNotifications(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.userId;
    const notifications = await notificationService.getNotifications(userId);
    res.json(notifications);
  } catch (error: any) {
    next(error);
  }
}

export async function markRead(req: Request, res: Response, next: NextFunction) {
  try {
    await notificationService.markRead(req.body.ids);
    res.json({ success: true });
  } catch (error: any) {
    next(error);
  }
}