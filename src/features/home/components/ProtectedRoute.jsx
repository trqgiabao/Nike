import { Navigate, Outlet, useLocation } from "react-router-dom";
import { readAuthSession } from "../../auth/session";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();
  const auth = readAuthSession();

  if (!auth?.accessToken) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}