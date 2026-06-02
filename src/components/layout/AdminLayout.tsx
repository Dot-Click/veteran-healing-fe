import { type ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, Menu, X, Settings, Home } from "lucide-react";
import AdminNav, { ADMIN_NAV_ITEMS, useAdminNavBadgeCounts } from "../admin/AdminNav";
import AdminNavBadge from "../admin/AdminNavBadge";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";
import ProfileModal from "../common/ProfileModal";
import SearchInput from "../common/SearchInput";

export interface AdminLayoutSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  search?: AdminLayoutSearchProps;
}

export default function AdminLayout({ children, title, search }: AdminLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signout } = useAuth();
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
    <div className="h-screen overflow-hidden bg-gray-50 lg:flex">
      <AdminNav />

      {/* Mobile navigation sidebar with smooth transition */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ease-in-out",
          isMobileNavOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40"
          aria-label="Close navigation"
          onClick={() => setIsMobileNavOpen(false)}
        />
        <aside
          className={cn(
            "relative flex h-full w-72 max-w-[85vw] flex-col bg-brand-primary shadow-xl transition-transform duration-300 ease-in-out transform",
            isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-brand-accent/40 px-6 py-4 h-24">
            <Link to="/" onClick={() => setIsMobileNavOpen(false)} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm overflow-hidden">
                <img src="/logo.webp" alt="Veteran Healing" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide">
                Veteran Healing
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="rounded-lg p-2 text-white hover:bg-brand-accent/40"
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="flex-1 p-3">
            <ul className="space-y-1">
              {ADMIN_NAV_ITEMS.map((item) => {
                const badgeCount =
                  item.label === "Notifications" ? totalUnread : getCount(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={cn(
                        "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        location.pathname === item.href
                          ? "bg-brand-accent text-white"
                          : "text-gray-300 hover:bg-brand-accent/40 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={16} />
                        {item.label}
                      </div>
                      <AdminNavBadge count={badgeCount} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="border-t border-brand-accent/40 p-3">
            <button
              type="button"
              onClick={handleSignout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-200 hover:bg-brand-accent/40 hover:text-white"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </aside>
      </div>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="z-30 flex h-24 flex-shrink-0 items-center border-b border-brand-accent/40 bg-brand-primary">
          <div className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="rounded-lg border border-brand-accent/40 bg-brand-primary/50 p-2 text-white shadow-sm lg:hidden hover:bg-brand-accent/40"
                aria-label="Open navigation"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                  Admin
                </p>
                <h1 className="truncate text-xl font-bold text-white sm:text-2xl">{title}</h1>
              </div>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{user?.name ?? "Admin"}</p>
                <p className="text-xs text-green-200/80">{user?.email}</p>
              </div>
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none py-2"
                >
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="h-10 w-10 rounded-full object-cover border-2 border-white/20 hover:border-white/50 transition-colors"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-sm border-2 border-white/20 hover:border-white/50 transition-colors">
                      {user?.name?.charAt(0).toUpperCase() ?? "A"}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 pt-2 w-48 z-50">
                    <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 flex flex-col gap-0.5">
                      <Link
                        to="/"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-primary rounded-lg transition-all"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Home size={16} />
                        Back to Site
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setProfileModalOpen(true);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-brand-cream hover:text-brand-primary rounded-lg transition-all text-left"
                      >
                        <Settings size={16} />
                        My Profile
                      </button>
                      <hr className="my-1 border-gray-150" />
                      <button
                        type="button"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleSignout();
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors text-left font-medium"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {search && (
          <div className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder={search.placeholder ?? "Search..."}
              className="max-w-xl"
            />
          </div>
        )}

        <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      <ProfileModal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </div>
  );

}
