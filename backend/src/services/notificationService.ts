import { AppDataSource } from '../config/db';
import { Notification } from '../models/Notification';

const notificationRepository = AppDataSource.getRepository(Notification);

export async function getNotifications(userId: string): Promise<Notification[]> {
  return notificationRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
}

export async function markRead(ids: string[]): Promise<void> {
  await notificationRepository.update(ids, { read: true });
}