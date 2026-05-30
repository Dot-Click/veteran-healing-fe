import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useNotifications, useMarkAsRead, useMarkAllAsRead, useDeleteNotification } from "../hooks/useNotifications";
import { Bell, Trash2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function NotificationPage() {
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'unread'
    ? notifications.filter((n: any) => !n.read)
    : notifications;

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsReadMutation.mutateAsync(notification.id).catch(() => {
        toast.error('Failed to mark as read');
      });
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotificationMutation.mutateAsync(id).then(() => {
      toast.success('Notification deleted');
    }).catch(() => {
      toast.error('Failed to delete notification');
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutateAsync().then(() => {
      toast.success('All notifications marked as read');
    }).catch(() => {
      toast.error('Failed to mark all as read');
    });
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'affiliate_approved':
        return 'bg-green-50 border-green-200';
      case 'affiliate_rejected':
        return 'bg-red-50 border-red-200';
      case 'contact_reviewed':
        return 'bg-blue-50 border-blue-200';
      case 'order_status_update':
        return 'bg-purple-50 border-purple-200';
      case 'review_approved':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      affiliate_approved: 'Affiliate Approved',
      affiliate_rejected: 'Affiliate Rejected',
      contact_reviewed: 'Contact Reviewed',
      order_status_update: 'Order Update',
      review_approved: 'Review Approved',
      affiliate_applied: 'New Affiliate Application',
    };
    return labels[type] || type;
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container-site max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={32} className="text-brand-dark" />
              <h1 className="text-3xl font-bold text-brand-dark">Notifications</h1>
            </div>
            <p className="text-gray-600">Stay updated on important events and messages</p>
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              All Notifications
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'unread'
                  ? 'bg-brand-primary text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              Unread
            </button>
            {notifications.some((n: any) => !n.read) && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
                className="ml-auto px-4 py-2 rounded-lg font-medium text-brand-primary border border-brand-primary hover:bg-brand-primary hover:text-white transition-all disabled:opacity-50"
              >
                {markAllAsReadMutation.isPending ? 'Marking...' : 'Mark All as Read'}
              </button>
            )}
          </div>

          {/* Notifications List */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i: number) => (
                <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium">
                {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                You're all caught up! We'll notify you when something important happens.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification: any) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'border-opacity-100' : 'border-opacity-50'
                  } hover:shadow-md`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-brand-dark">
                          {notification.title}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-60 text-gray-700">
                          {getNotificationTypeLabel(notification.type)}
                        </span>
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-brand-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-gray-700 text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
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
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsReadMutation.mutateAsync(notification.id).then(() => {
                              toast.success('Marked as read');
                            }).catch(() => {
                              toast.error('Failed to mark as read');
                            });
                          }}
                          disabled={markAsReadMutation.isPending}
                          className="p-2 hover:bg-white hover:bg-opacity-60 rounded-lg transition-all disabled:opacity-50"
                          title="Mark as read"
                        >
                          <CheckCircle2 size={20} className="text-brand-primary" />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, notification.id)}
                        className="p-2 hover:bg-white hover:bg-opacity-60 rounded-lg transition-all text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
