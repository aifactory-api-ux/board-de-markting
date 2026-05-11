import apiClient from './client';
import type { Attachment } from '../utils/apiTypes';

export const attachmentsApi = {
  upload: async (cardId: string, file: File): Promise<Attachment> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<Attachment>(`/api/cards/${cardId}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/attachments/${id}`);
  },
};