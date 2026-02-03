import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { setAuth } from "../../features/auth/authSlice";
import { showSuccess } from "../../utils/toast";
import type { Role } from "../../constants/roles";
import { useDispatch } from "react-redux";

interface JwtPayload {
  userId: string;
  role: Role;
  email?: string;
}

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (!accessToken) {
      console.error("No access token in URL");
      navigate("/login");
      return;
    }

    // Decode token
    const decoded = jwtDecode<JwtPayload>(accessToken);

    // Store in Redux (this feeds interceptors)
    dispatch(
      setAuth({
        accessToken,
        user: {
          id: decoded.userId,
          email: decoded.email ?? "",
          role: decoded.role,
        },
        isAuthenticated: true,
      })
    );

    showSuccess("Login successful 🎉");
    const redirectPath = `/${decoded.role}/home`;

    // Clean URL
    window.history.replaceState({}, "", redirectPath);

    // Redirect based on role
    setTimeout(() => {
        navigate(redirectPath, { replace: true });
    }, 500);
  }, [dispatch, navigate]);

  return null;
};

export default GoogleCallback;
