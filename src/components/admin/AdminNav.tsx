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
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";

export const ADMIN_NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Heart, label: "Donations", href: "/admin/donations" },
  { icon: Users, label: "Affiliates", href: "/admin/affiliates" },
  { icon: Mail, label: "Contact Form", href: "/admin/contact" },
  { icon: FileText, label: "Free Guide", href: "/admin/guides" },
  { icon: Bell, label: "Notifications", href: "/admin/notifications" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signout } = useAuth();

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
    <aside className="hidden w-64 flex-shrink-0 bg-brand-primary min-h-screen lg:flex lg:flex-col">
      {/* Logo / Brand */}
      <div className="flex h-24 items-center px-6 border-b border-r border-brand-accent/40">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div
            className="w-15 h-15 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden"
          >
            <img src="/logo.webp" alt="Veteran Healing" className="w-[80px] object-contain" />
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-brand-accent text-white"
                    : "text-gray-300 hover:bg-brand-accent/40 hover:text-white"
                )}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-brand-accent/40">
        <button
          type="button"
          onClick={handleSignout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:bg-brand-accent/40 hover:text-white"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
