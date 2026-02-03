//(This is what keeps the access token alive on refresh)
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setAuth, logout } from "../features/auth/authSlice";
import { setUser } from "../features/user/userSlice";
import api from "../api/axios";
import { socket } from "../socket";
import { registerSocketListeners } from "../socket/chat.listeners";
import { showError } from "../utils/toast";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await api.post("/auth/refresh");
        const refreshedUser = res.data.user;
        
        if (refreshedUser?.isBlocked) {
          showError("Your account has been blocked by admin.");

          dispatch(logout());
          dispatch(setUser({ user: null }));

          socket.disconnect(); 
          return;
        }

        // store auth
        dispatch(
          setAuth({
            accessToken: res.data.accessToken,
            user: refreshedUser,
            isAuthenticated: true,
          })
        );

        // store full user profile
        dispatch(setUser({ user: refreshedUser }));
      } catch {
        dispatch(logout());
        dispatch(setUser({ user: null }));
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [dispatch]);


  // socket follows accessToken
  useEffect(() => {
    if (!accessToken) {
      socket.disconnect();
      return;
    }

    // attach token
    socket.auth = { token: accessToken };

    // connect socket
    socket.connect();

    // register listener once per connection
    registerSocketListeners();

    return () => {
      socket.off(); // removes all listeners
      socket.disconnect();
    };
  }, [accessToken]);


  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;
