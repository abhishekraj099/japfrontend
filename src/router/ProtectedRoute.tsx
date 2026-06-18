import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/providers/AuthProvider";
import { ROUTES } from "@/constants/routes";

export function ProtectedRoute() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return null;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) return null;
  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return <Outlet />;
}
