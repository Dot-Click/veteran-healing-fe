import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardPath, isAdminRole } from "../../lib/authRedirects";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream-light">
        <div className="w-8 h-8 border-4 border-brand-cta border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdminRole(user?.role)) {
    return <Navigate to={getDashboardPath(user?.role)} replace />;
  }

  return children;
}
