import apiClient from './client';
import { AuthLoginRequest, AuthLoginResponse, AuthMeResponse } from '../../../shared/types';

export const authApi = {
  login: async (data: AuthLoginRequest): Promise<AuthLoginResponse> => {
    const response = await apiClient.post<AuthLoginResponse>('/api/auth/login', data);
    return response.data;
  },
  me: async (): Promise<AuthMeResponse> => {
    const response = await apiClient.get<AuthMeResponse>('/api/auth/me');
    return response.data;
  },
  logout: async (): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/api/auth/logout');
    return response.data;
  },
};