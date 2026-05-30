import { type ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, Menu, X, Settings, Home } from "lucide-react";
import AdminNav, { ADMIN_NAV_ITEMS } from "../admin/AdminNav";
import { cn } from "../../lib/utils";
import { useAuth } from "../../contexts/AuthContext";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signout, updateProfile } = useAuth();

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
      navigate("/auth", { replace: true });
      return;
    }
    toast.error(result.error ?? "Unable to sign out.");
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
    <div className="min-h-screen bg-gray-50 lg:flex">
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
              {ADMIN_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
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

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-brand-accent/40 bg-brand-primary h-24 flex items-center">
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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8" style={{ maxHeight: 'calc(100vh - 6rem)' }}>{children}</main>
      </div>

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
                    className="w-20 h-20 rounded-full object-cover border-2 border-brand-primary/20 shadow-md"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-150 bg-gray-50 text-gray-400 text-sm cursor-not-allowed"
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
                  Role: {user?.role ?? "admin"}
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
    </div>
  );

}
