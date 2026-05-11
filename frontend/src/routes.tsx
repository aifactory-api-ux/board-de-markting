import App from './App';

export const routes = {
  login: '/login',
  home: '/',
  board: (id: string) => `/board/${id}`,
  card: (id: string) => `/card/${id}`,
  adminUsers: '/admin/users',
  settings: '/settings',
};