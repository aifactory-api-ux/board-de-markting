import apiClient from './client';
import { ContentCard, Paginated } from '../../../shared/types';

export const cardsApi = {
  getByBoard: async (boardId: string, columnId?: string, page: number = 1, pageSize: number = 50): Promise<Paginated<ContentCard>> => {
    const response = await apiClient.get<Paginated<ContentCard>>(`/api/boards/${boardId}/cards`, {
      params: { columnId, page, pageSize },
    });
    return response.data;
  },
  getById: async (id: string): Promise<ContentCard> => {
    const response = await apiClient.get<ContentCard>(`/api/cards/${id}`);
    return response.data;
  },
  create: async (boardId: string, data: { title: string; description: string; columnId: string; assigneeId?: string | null; dueDate?: string | null; tags?: string[] }): Promise<ContentCard> => {
    const response = await apiClient.post<ContentCard>(`/api/boards/${boardId}/cards`, data);
    return response.data;
  },
  update: async (id: string, data: Partial<ContentCard>): Promise<ContentCard> => {
    const response = await apiClient.put<ContentCard>(`/api/cards/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/cards/${id}`);
  },
};