import apiClient from './client';
import { KanbanColumn } from '../../../shared/types';

export const columnsApi = {
  getByBoard: async (boardId: string): Promise<KanbanColumn[]> => {
    const response = await apiClient.get<KanbanColumn[]>(`/api/boards/${boardId}/columns`);
    return response.data;
  },
  create: async (boardId: string, data: { name: string; order: number }): Promise<KanbanColumn> => {
    const response = await apiClient.post<KanbanColumn>(`/api/boards/${boardId}/columns`, data);
    return response.data;
  },
  update: async (id: string, data: Partial<KanbanColumn>): Promise<KanbanColumn> => {
    const response = await apiClient.put<KanbanColumn>(`/api/columns/${id}`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/columns/${id}`);
  },
};