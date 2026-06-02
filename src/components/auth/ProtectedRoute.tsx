import { Navigate } from "react-router-dom";
import RouteLoadingShell from "../common/RouteLoadingShell";
import { useAuth } from "../../contexts/AuthContext";
import { getDashboardPath, isAdminRole } from "../../lib/authRedirects";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <RouteLoadingShell />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !isAdminRole(user?.role)) {
    return <Navigate to={getDashboardPath(user?.role)} replace />;
  }

  return children;
}
