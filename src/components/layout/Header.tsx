import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, User, LogOut, Settings, LayoutDashboard, Bell } from "lucide-react";
import { NAV_LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";
import MobileMenu from "./MobileMenu";
import { useCart } from "../../hooks/useCart";
import { ASSETS } from "../../lib/assetPaths";
import { useAuth } from "../../contexts/AuthContext";
import { useUnreadCount } from "../../hooks/useNotifications";
import toast from "react-hot-toast";
import { isAdminRole } from "../../lib/authRedirects";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, isAuthenticated, signout, updateProfile } = useAuth();
  const { data: unreadCount = 0 } = useUnreadCount();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [profileName, setProfileName] = useState(user?.name ?? "");
  const [profileImage, setProfileImage] = useState(user?.image ?? "");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileName(user.name);
      setProfileImage(user.image ?? "");
    }
  }, [user]);

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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setIsUpdating(true);
    try {
      const result = await updateProfile(profileName, profileImage || null);
      if (result.success) {
        toast.success("Profile updated successfully!");
        setProfileModalOpen(false);
      } else {
        toast.error(result.error ?? "Failed to update profile.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <header className="bg-brand-cream-light border-b border-brand-border sticky top-0 z-30 shadow-sm"
        style={{ backgroundImage: `url(${ASSETS.HEADER_BG})`, backgroundSize: 'cover' }}>
        <div className="container-site">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <img src="/logo.webp" alt="Veteran Healing Logo" className="w-[70px]" />
              {/* <img src={veter} alt="" /> */}
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    location.pathname === link.href
                      ? "text-brand-cta font-semibold underline underline-offset-4"
                      : "text-brand-dark hover:text-brand-cta"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right action icons */}
            <div className="flex items-center gap-2 lg:gap-3">
              <button
                className="p-2 text-brand-dark hover:text-brand-cta transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                to="/cart"
                className="relative p-2 text-brand-dark hover:text-brand-cta transition-colors"
                aria-label={`Shopping cart, ${totalItems} items`}
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-gold text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated && (
                <Link
                  to="/notifications"
                  className="relative p-2 text-brand-dark hover:text-brand-cta transition-colors"
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
                  className="p-2 text-brand-dark hover:text-brand-cta transition-colors flex items-center justify-center focus:outline-none"
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
                          ) : (
                            <Link
                              to="/dashboard"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-brand-dark hover:bg-brand-cream hover:text-brand-primary rounded-xl transition-all"
                              onClick={() => setUserDropdownOpen(false)}
                            >
                              <LayoutDashboard size={16} />
                              My Dashboard
                            </Link>
                          )}
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
                className="lg:hidden p-2 text-brand-primary hover:text-brand-cta transition-colors"
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

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-brand-border/20">
            {/* Modal Header */}
            <div className="bg-brand-primary p-6 text-white">
              <h2 className="text-xl font-bold">My Profile</h2>
              <p className="text-xs text-green-200/80 mt-1">Manage and update your personal details</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center mb-2">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-brand-primary/20 shadow-md animate-fade-in"
                    onError={(e) => {
                      e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profileName)}`;
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-brand-cream text-brand-primary font-bold text-2xl flex items-center justify-center border-2 border-brand-primary/20 shadow-md">
                    {profileName.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <span className="text-xs text-gray-500 mt-2 font-medium">Avatar Preview</span>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary focus:outline-none transition-colors"
                  placeholder="Your Name"
                  required
                />
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Email Address (Read-only)
                </label>
                <input
                  type="email"
                  value={user?.email ?? ""}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-150 bg-gray-50 text-gray-450 text-sm cursor-not-allowed"
                />
              </div>

              {/* Avatar URL Field */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-brand-primary focus:outline-none transition-colors"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              {/* Role (Read-only) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Account Role
                </label>
                <div className="w-full px-4 py-2 bg-brand-cream/35 text-brand-cta rounded-xl text-xs font-bold capitalize inline-flex items-center">
                  Role: {user?.role ?? "customer"}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => {
                    if (user) {
                      setProfileName(user.name);
                      setProfileImage(user.image ?? "");
                    }
                    setProfileModalOpen(false);
                  }}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-2.5 text-sm font-semibold text-white bg-brand-cta rounded-xl hover:bg-brand-primary transition-colors flex items-center justify-center gap-2"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
