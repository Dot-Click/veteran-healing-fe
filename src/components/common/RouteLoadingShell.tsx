import { Link, useLocation } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import ContentAreaLoader from "./ContentAreaLoader";
import { ADMIN_NAV_ITEMS } from "../admin/AdminNav";

function getAdminTitle(pathname: string): string {
  const match = ADMIN_NAV_ITEMS.find((item) => item.href === pathname);
  if (match) return match.label;
  if (pathname.startsWith("/admin/featured")) return "Featured";
  if (pathname.startsWith("/admin")) return "Admin";
  return "Loading";
}

function DashboardLoadingShell() {
  return (
    <div className="min-h-screen bg-brand-cream-light">
      <header className="border-b border-brand-border/20 bg-white">
        <div className="container-site flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src="/title_logo.webp" alt="Veteran Healing" className="h-14 w-auto" />
          </Link>
        </div>
      </header>
      <main className="container-site py-8 lg:py-12">
        <ContentAreaLoader />
      </main>
    </div>
  );
}

function AuthLoadingShell() {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#FCFCF1" }}>
      <div className="hidden h-full md:flex md:w-1/2 lg:w-5/12 bg-brand-primary/10" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-cta border-t-transparent" />
      </div>
    </div>
  );
}

/**
 * Keeps site chrome (header, sidebar, admin nav) visible while lazy routes
 * or auth session checks are in progress.
 */
export default function RouteLoadingShell() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return (
      <AdminLayout title={getAdminTitle(pathname)}>
        <ContentAreaLoader />
      </AdminLayout>
    );
  }

  if (pathname === "/dashboard") {
    return <DashboardLoadingShell />;
  }

  if (pathname.startsWith("/auth") || pathname === "/login" || pathname === "/signup") {
    return <AuthLoadingShell />;
  }

  return (
    <MainLayout>
      <ContentAreaLoader />
    </MainLayout>
  );
}
