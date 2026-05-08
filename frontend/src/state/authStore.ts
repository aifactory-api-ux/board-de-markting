import { create } from 'zustand';

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password, rememberMe) => {
    set({ loading: true, error: null });
    try {
      const { authApi } = await import('../api/auth');
      const response = await authApi.login({ email, password, rememberMe });
      localStorage.setItem('token', response.token);
      set({ user: response.user, token: response.token, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      const { authApi } = await import('../api/auth');
      await authApi.logout();
    } finally {
      localStorage.removeItem('token');
      set({ user: null, token: null });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ loading: false });
      return;
    }

    set({ loading: true });
    try {
      const { authApi } = await import('../api/auth');
      const response = await authApi.me();
      set({ user: response.user, token, loading: false });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, loading: false });
    }
  },
}));