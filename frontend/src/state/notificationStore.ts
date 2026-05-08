import { create } from 'zustand';

interface NotificationState {
  notifications: any[];
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markRead: (ids: string[]) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const { notificationsApi } = await import('../api/notifications');
      const notifications = await notificationsApi.getAll();
      set({ notifications, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  markRead: async (ids) => {
    try {
      const { notificationsApi } = await import('../api/notifications');
      await notificationsApi.markRead(ids);
      set({ notifications: get().notifications.map((n) => (ids.includes(n.id) ? { ...n, read: true } : n)) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));