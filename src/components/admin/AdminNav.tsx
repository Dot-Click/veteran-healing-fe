import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Settings,
  ShoppingBag,
  Users,
  FileText,
  Bell,
  MessageSquare,
  Star,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { getUnreadCountForAdminNav } from "../../lib/adminNotifications";
import AdminNavBadge from "./AdminNavBadge";

export const ADMIN_NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Star, label: "Featured", href: "/admin/featured" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Heart, label: "Donations", href: "/admin/donations" },
  { icon: Users, label: "Affiliates", href: "/admin/affiliates" },
  { icon: MessageSquare, label: "Reviews", href: "/admin/reviews" },
  { icon: Mail, label: "Contact Form", href: "/admin/contact" },
  { icon: FileText, label: "Free Guide", href: "/admin/guides" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function useAdminNavBadgeCounts() {
  const { data: notifications = [] } = useNotifications();

  return {
    notifications,
    totalUnread: notifications.filter((n) => !n.read).length,
    getCount: (href: string) => getUnreadCountForAdminNav(notifications, href),
  };
}

export default function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signout } = useAuth();
  const { totalUnread, getCount } = useAdminNavBadgeCounts();

  const handleSignout = async () => {
    const result = await signout();
    if (result.success) {
      toast.success("Signed out successfully.");
      navigate("/auth", { replace: true });
      return;
    }
    toast.error(result.error ?? "Unable to sign out.");
  };

  return (
    <aside className="hidden h-screen w-[15.5rem] flex-shrink-0 flex-col overflow-hidden bg-brand-primary lg:sticky lg:top-0 lg:flex">
      <div className="flex-shrink-0 border-b border-brand-accent/40 px-4 py-1 border">
        <Link
          to="/"
          className="mx-auto flex w-fit flex-col items-center gap-2 rounded-xl p-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white p-2 shadow-sm">
            <img src="/logo.webp" alt="Veteran Healing" className="h-full w-full object-contain" />
          </div>
        </Link>
      </div>

      <nav className="flex min-h-0 flex-1 flex-col p-2">
        <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {ADMIN_NAV_ITEMS.map((item) => {
            const badgeCount =
              item.label === "Notifications" ? totalUnread : getCount(item.href);

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-[13px] font-medium leading-tight transition-colors",
                    location.pathname === item.href
                      ? "bg-brand-accent text-white"
                      : "text-gray-300 hover:bg-brand-accent/40 hover:text-white"
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <item.icon size={15} className="flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <AdminNavBadge count={badgeCount} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex-shrink-0 border-t border-brand-accent/40 pt-2">
          <button
            type="button"
            onClick={handleSignout}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold text-gray-200 transition-colors hover:bg-brand-accent/40 hover:text-white"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
}
