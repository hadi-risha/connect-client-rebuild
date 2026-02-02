import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { performLogout } from "../service/auth.actions";

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.isBlocked) {
      performLogout(dispatch);
    }
  }, [user?.isBlocked, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.isBlocked) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
