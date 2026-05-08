import { create } from 'zustand';

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  createUser: (data: any) => Promise<void>;
  updateUser: (id: string, data: Partial<any>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const { usersApi } = await import('../api/users');
      const result = await usersApi.getAll();
      set({ users: result.items, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createUser: async (data) => {
    try {
      const { usersApi } = await import('../api/users');
      const user = await usersApi.create(data);
      set({ users: [...get().users, user] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateUser: async (id, data) => {
    try {
      const { usersApi } = await import('../api/users');
      const updated = await usersApi.update(id, data);
      set({ users: get().users.map((u) => (u.id === id ? updated : u)) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const { usersApi } = await import('../api/users');
      await usersApi.delete(id);
      set({ users: get().users.filter((u) => u.id !== id) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));