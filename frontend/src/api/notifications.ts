import apiClient from './client';
import { Notification } from '../../../shared/types';

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/api/notifications');
    return response.data;
  },
  markRead: async (ids: string[]): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/api/notifications/mark-read', { ids });
    return response.data;
  },
};