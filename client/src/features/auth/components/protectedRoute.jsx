import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Loader from "../../../shared/components/loader.jsx";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, token, loading } = useAuth();
  console.log({ user, token, loading });
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
