import apiClient from './client';
import { Tag } from '../../../shared/types';

export const tagsApi = {
  getAll: async (): Promise<Tag[]> => {
    const response = await apiClient.get<Tag[]>('/api/tags');
    return response.data;
  },
  create: async (data: { name: string; color: string }): Promise<Tag> => {
    const response = await apiClient.post<Tag>('/api/tags', data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/tags/${id}`);
  },
};