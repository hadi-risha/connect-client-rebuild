// Public Routes - Should NOT be accessible when logged in
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Role } from "../constants/roles";

export const PublicRoute = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  if (isAuthenticated && user) {
    // redirect based on role
    if (user.role === Role.STUDENT) {
      return <Navigate to="/student/home" replace />;
    }
    if (user.role === Role.INSTRUCTOR) {
      return <Navigate to="/instructor/home" replace />;
    }
    if (user.role === Role.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <Outlet />;
};
