import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, Package, Heart, User, ShoppingBag } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const QUICK_LINKS = [
  { icon: ShoppingBag, label: "Shop Sacraments", href: "/shop" },
  { icon: Package, label: "View Cart", href: "/cart" },
  { icon: Heart, label: "Support Donations", href: "/donation" },
];

export default function UserDashboardPage() {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-brand-cream-light">
      <header className="bg-white border-b border-brand-border/20">
        <div className="container-site py-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/title_logo.webp" alt="Veteran Healing" className="h-14 w-auto" />
          </Link>
          <button
            type="button"
            onClick={handleSignout}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-cta"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      <main className="container-site py-8 lg:py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
            Customer Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-brand-dark">
            Welcome{user?.name ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-2 max-w-2xl text-gray-600">
            Manage your Veteran Healing account, continue shopping, and stay connected to the
            mission.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {QUICK_LINKS.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group rounded-xl border border-brand-border/20 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-cta/10 text-brand-cta transition-colors group-hover:bg-brand-cta group-hover:text-white">
                <item.icon size={24} />
              </div>
              <h2 className="text-lg font-bold text-brand-dark">{item.label}</h2>
            </Link>
          ))}
        </div>

        <section className="mt-8 rounded-xl border border-brand-border/20 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-cream text-brand-cta">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-dark">Account Details</h2>
              <p className="mt-1 text-sm text-gray-600">{user?.email}</p>
              <p className="mt-1 text-sm capitalize text-gray-500">
                Role: {user?.role ?? "customer"}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
