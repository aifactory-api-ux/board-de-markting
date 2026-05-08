import { useNotificationStore } from '../state/notificationStore';

export function useNotifications() {
  const { notifications, loading, error, fetchNotifications, markRead } = useNotificationStore();

  return { notifications, loading, error, fetchNotifications, markRead };
}