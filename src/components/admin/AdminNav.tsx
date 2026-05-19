import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Heart,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Tag, label: "Coupons", href: "/admin/coupons" },
  { icon: Heart, label: "Donations", href: "/admin/donations" },
  { icon: Users, label: "Affiliates", href: "/admin/affiliates" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminNav() {
  const location = useLocation();
  return (
    <aside className="w-56 flex-shrink-0 bg-brand-primary min-h-screen">
      <div className="p-5 border-b border-brand-accent/40">
        <Link to="/" className="text-white font-bold text-sm">
          ← Back to Site
        </Link>
      </div>
      <nav className="p-3">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
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
    </aside>
  );
}
