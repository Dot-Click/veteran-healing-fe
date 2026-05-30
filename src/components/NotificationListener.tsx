import { useSocketNotifications } from '../hooks/useSocketNotifications';

export function NotificationListener() {
  // Initialize Socket.io connection
  useSocketNotifications();
  return null;
}
