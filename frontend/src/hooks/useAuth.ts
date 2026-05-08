import { useAuthStore } from '../state/authStore';

export function useAuth() {
  const { user, token, loading, error, login, logout, checkAuth } = useAuthStore();

  return { user, token, loading, error, login, logout, checkAuth };
}