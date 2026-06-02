import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useNotifications, useMarkAsRead, useMarkAllAsRead, useDeleteNotification } from "../hooks/useNotifications";
import { Bell, Trash2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { getNotificationTypeLabel } from "../lib/adminNotifications";
import { getUserNotificationBadgeClass, getUserNotificationCardClass } from "../lib/userNotifications";

export default function NotificationPage() {
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteNotificationMutation = useDeleteNotification();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = (notification: { id: string; read: boolean; link?: string | null }) => {
    if (!notification.read) {
      markAsReadMutation.mutateAsync(notification.id).catch(() => {
        toast.error("Failed to mark as read");
      });
    }
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotificationMutation.mutateAsync(id).then(() => {
      toast.success("Notification deleted");
    }).catch(() => {
      toast.error("Failed to delete notification");
    });
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutateAsync().then(() => {
      toast.success("All notifications marked as read");
    }).catch(() => {
      toast.error("Failed to mark all as read");
    });
  };

  return (
    <MainLayout>
      <div className="bg-brand-cream-light py-10 lg:py-14">
        <div className="container-site max-w-2xl">
          <div className="mb-8 rounded-2xl border border-brand-border/20 bg-brand-primary p-6 text-white shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/20">
                <Bell size={22} className="text-brand-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-sm text-green-100/90">
                  Stay updated on orders, reviews, contact replies, and more
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <p className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {unreadCount} unread
              </p>
            )}
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                filter === "all"
                  ? "bg-brand-cta text-white shadow-sm"
                  : "border border-brand-border/30 bg-white text-brand-dark hover:bg-brand-cream"
              }`}
            >
              All Notifications
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                filter === "unread"
                  ? "bg-brand-cta text-white shadow-sm"
                  : "border border-brand-border/30 bg-white text-brand-dark hover:bg-brand-cream"
              }`}
            >
              Unread
            </button>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                disabled={markAllAsReadMutation.isPending}
                className="ml-auto rounded-lg border border-brand-cta px-4 py-2 text-sm font-semibold text-brand-cta transition-all hover:bg-brand-cta hover:text-white disabled:opacity-50"
              >
                {markAllAsReadMutation.isPending ? "Marking..." : "Mark All as Read"}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 animate-pulse rounded-xl bg-white/80" />
              ))}
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="rounded-2xl border border-brand-border/25 bg-white py-12 text-center shadow-sm">
              <Bell size={48} className="mx-auto mb-4 text-brand-border" />
              <p className="font-medium text-brand-dark">
                {filter === "unread" ? "No unread notifications" : "No notifications yet"}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                You&apos;re all caught up. We&apos;ll notify you when something important happens.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`rounded-xl p-4 transition-all ${getUserNotificationCardClass(
                    notification.type,
                    notification.read
                  )}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-brand-dark">{notification.title}</h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getUserNotificationBadgeClass(
                            notification.type
                          )}`}
                        >
                          {getNotificationTypeLabel(notification.type)}
                        </span>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-brand-gold" aria-label="Unread" />
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-gray-700">{notification.message}</p>
                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()} at{" "}
                        {new Date(notification.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex flex-shrink-0 gap-1">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsReadMutation.mutateAsync(notification.id).then(() => {
                              toast.success("Marked as read");
                            }).catch(() => {
                              toast.error("Failed to mark as read");
                            });
                          }}
                          disabled={markAsReadMutation.isPending}
                          className="rounded-lg p-2 text-brand-cta transition-colors hover:bg-brand-cream disabled:opacity-50"
                          title="Mark as read"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                      )}
                      <button
                        onClick={(e) => handleDelete(e, notification.id)}
                        className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
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
