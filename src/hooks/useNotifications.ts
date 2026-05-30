import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../services/notificationService";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getNotifications,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["unread-count"],
    queryFn: notificationService.getUnreadCount,
  });
}

export function useMarkAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.markAsRead(notificationId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });
}

export function useMarkAllAsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });
}

export function useDeleteNotification() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
      qc.invalidateQueries({ queryKey: ["unread-count"] });
    },
  });
}
