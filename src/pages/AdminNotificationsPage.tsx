import AdminLayout from "../components/layout/AdminLayout";
import { useNotifications, useMarkAsRead, useDeleteNotification, useMarkAllAsRead } from "../hooks/useNotifications";
import toast from "react-hot-toast";
import { Trash2, CheckCircle2, Clock } from "lucide-react";

export default function AdminNotificationsPage() {
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkAsRead();
  const deleteNotification = useDeleteNotification();
  const markAllAsRead = useMarkAllAsRead();

  async function handleMarkAsRead(id: string) {
    try {
      await markAsRead.mutateAsync(id);
    } catch {
      toast.error("Failed to mark as read");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this notification?")) {
      return;
    }
    try {
      await deleteNotification.mutateAsync(id);
      toast.success("Notification deleted");
    } catch {
      toast.error("Failed to delete notification");
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await markAllAsRead.mutateAsync();
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark all as read");
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AdminLayout title="Notifications">
      <div className="space-y-6">
        {/* Header with action */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">
              {notifications.length} total notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex px-3 py-1 rounded-full text-xs font-bold bg-brand-primary text-white">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={markAllAsRead.isPending}
              className="px-4 py-2 text-sm font-semibold bg-brand-primary text-white rounded-xl hover:bg-brand-cta transition-colors disabled:opacity-50"
            >
              {markAllAsRead.isPending ? 'Marking...' : 'Mark All as Read'}
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
            ))
          ) : notifications.length === 0 ? (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-lg">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  notification.read
                    ? "bg-white border-gray-200 border-opacity-50"
                    : "bg-brand-cream border-brand-primary border-opacity-100"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-brand-dark">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-60 text-gray-700">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                      {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        disabled={markAsRead.isPending}
                        className="p-2 hover:bg-white hover:bg-opacity-60 rounded-lg transition-all disabled:opacity-50"
                        title="Mark as read"
                      >
                        <CheckCircle2 size={20} className="text-brand-primary" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      disabled={deleteNotification.isPending}
                      className="p-2 hover:bg-white hover:bg-opacity-60 rounded-lg transition-all text-red-500"
                      title="Delete notification"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
