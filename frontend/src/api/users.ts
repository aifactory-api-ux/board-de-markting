import apiClient from './client';
import type { User, Paginated } from '../utils/apiTypes';

export const usersApi = {
  getAll: async (page: number = 1, pageSize: number = 10): Promise<Paginated<User>> => {
    const response = await apiClient.get<Paginated<User>>('/api/users', { params: { page, pageSize } });
    return response.data;
  },
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/api/users/${id}`);
    return response.data;
  },
  create: async (data: { name: string; email: string; role: 'admin' | 'editor' | 'viewer'; password: string }): Promise<User> => {
    const response = await apiClient.post<User>('/api/users', data);
    return response.data;
  },
  update: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<User>(`/api/users/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/users/${id}`);
  },
};