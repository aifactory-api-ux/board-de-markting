import apiClient from './client';
import { Board, BoardMetrics } from '../../../shared/types';

export const boardsApi = {
  getAll: async (): Promise<Board[]> => {
    const response = await apiClient.get<Board[]>('/api/boards');
    return response.data;
  },
  getById: async (id: string): Promise<Board> => {
    const response = await apiClient.get<Board>(`/api/boards/${id}`);
    return response.data;
  },
  create: async (data: { name: string; description: string }): Promise<Board> => {
    const response = await apiClient.post<Board>('/api/boards', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Board>): Promise<Board> => {
    const response = await apiClient.put<Board>(`/api/boards/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/boards/${id}`);
  },
  getMetrics: async (boardId: string): Promise<BoardMetrics> => {
    const response = await apiClient.get<BoardMetrics>(`/api/boards/${boardId}/metrics`);
    return response.data;
  },
};