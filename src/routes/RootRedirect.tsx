import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Role } from "../constants/roles";

export default function RootRedirect() {
  const { user } = useAppSelector((s) => s.user);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // logged in → role based redirect
  if (user.role === Role.ADMIN) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === Role.INSTRUCTOR) {
    return <Navigate to="/instructor/home" replace />;
  }

  return <Navigate to="/student/home" replace />;
}
