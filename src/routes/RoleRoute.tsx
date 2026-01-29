// This checks WHO can access, not just whether logged in
import { Navigate, Outlet  } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Role } from "../constants/roles";

interface Props {
  roles: Role[];
}

export const RoleRoute = ({ roles }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
