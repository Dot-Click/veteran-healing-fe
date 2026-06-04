import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmoothNavLink from "../common/SmoothNavLink";
import { Menu, ShoppingCart, User, LogOut, Settings, LayoutDashboard, Bell } from "lucide-react";
import { NAV_LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";
import MobileMenu from "./MobileMenu";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../contexts/AuthContext";
import { useUnreadCount } from "../../hooks/useNotifications";
import toast from "react-hot-toast";
import { isAdminRole } from "../../lib/authRedirects";
import ProfileModal from "../common/ProfileModal";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, isAuthenticated, signout } = useAuth();
  const { data: unreadCount = 0 } = useUnreadCount();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleSignout = async () => {
    const result = await signout();
    if (result.success) {
      toast.success("Signed out successfully.");
      navigate("/");
    } else {
      toast.error(result.error ?? "Failed to sign out.");
    }
    setUserDropdownOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-brand-primary text-white shadow-[0_10px_30px_rgba(17,59,44,0.18)] transition-all duration-300",
          isHome ? "border-white/10" : "border-brand-border/20"
        )}
        style={{ backgroundImage: `linear-gradient(135deg, rgba(18, 58, 44, 0.98), rgba(18, 58, 44, 0.98))`, backgroundSize: 'cover' }}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <SmoothNavLink to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img
                src="/logo.webp"
                alt="Veteran Healing Logo"
                className="w-[40px] lg:w-[70px] bg-white rounded-full"
              />
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-[11px] lg:text-sm tracking-widest uppercase">Veteran</span>
                <span className="text-brand-gold font-bold text-[11px] lg:text-sm tracking-widest uppercase">Healing</span>
              </div>
            </SmoothNavLink>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <SmoothNavLink
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-semibold rounded-full border transition-all duration-200",
                    location.pathname === link.href
                      ? "bg-white text-brand-primary border-white shadow-sm"
                      : "text-white border-transparent hover:bg-white/10 hover:text-brand-gold"
                  )}
                >
                  {link.label}
                </SmoothNavLink>
              ))}
            </nav>

            {/* Right action icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              {isAuthenticated && (
                <Link
                  to="/cart"
                  className={cn("relative p-2 transition-colors text-white hover:text-brand-gold")}
                  aria-label={`Shopping cart, ${totalItems} items`}
                >
                  <ShoppingCart size={20} />
                  {totalItems > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </Link>
              )}

              {isAuthenticated && (
                <Link
                  to="/notifications"
                  className={cn("relative p-2 transition-colors text-white hover:text-brand-gold")}
                  aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </Link>
              )}

              <div
                className="relative"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={cn("p-2 transition-colors flex items-center justify-center focus:outline-none text-white hover:text-brand-gold ")}
                  aria-label="User Account Menu"
                >
                  {isAuthenticated && user?.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-primary/20"
                    />
                  ) : (
                    <User size={20} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 pt-2 w-52 z-50">
                    <div className="rounded-2xl bg-white p-2 shadow-xl border border-brand-border/10 ring-1 ring-black/5">
                      {isAuthenticated ? (
                        <>
                          <div className="px-4 py-2 border-b border-gray-100 mb-1">
                            <p className="text-sm font-bold text-brand-dark truncate">{user?.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                          </div>
                          {isAdminRole(user?.role) ? (
                            <Link
                              to="/admin"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-primary rounded-xl transition-all"
                              onClick={() => setUserDropdownOpen(false)}
                            >
                              <LayoutDashboard size={16} />
                              Admin Dashboard
                            </Link>
                          ) : ""}
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-primary rounded-xl transition-all text-left"
                            onClick={() => {
                              setUserDropdownOpen(false);
                              setProfileModalOpen(true);
                            }}
                          >
                            <Settings size={16} />
                            My Profile
                          </button>
                          <hr className="my-1 border-gray-100" />
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl transition-all text-left font-medium"
                            onClick={handleSignout}
                          >
                            <LogOut size={16} />
                            Sign Out
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/auth"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-primary rounded-xl transition-all"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/auth"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-primary rounded-xl transition-all"
                            onClick={() => {
                              setUserDropdownOpen(false);
                            }}
                          >
                            Create Account
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Mobile hamburger */}
              <button
                className={cn("lg:hidden p-2 transition-colors", isHome ? "text-white hover:text-brand-gold" : "text-brand-primary hover:text-brand-cta")}
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <ProfileModal open={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </>
  );
}
