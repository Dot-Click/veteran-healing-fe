import api from './api';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  link?: string | null;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await api.get('/notifications');
    return data;
  },

  markAsRead: async (notificationId: string): Promise<Notification> => {
    const { data } = await api.patch(`/notifications/${notificationId}/read`);
    return data;
  },

  markAllAsRead: async (): Promise<void> => {
    await api.post('/notifications/mark-all-read');
  },

  deleteNotification: async (notificationId: string): Promise<void> => {
    await api.delete(`/notifications/${notificationId}`);
  },

  getUnreadCount: async (): Promise<number> => {
    const { data } = await api.get('/notifications/unread-count');
    return data.count;
  },
};
