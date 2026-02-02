// logout api call from component(component -> action -> api -> axios)
import { logoutApi } from "../api/userAuth.api";
import { logout } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";
import { clearUser } from "../features/user/userSlice";

export const performLogout = async (dispatch: AppDispatch) => {
  try {
    await logoutApi();
    dispatch(logout());
    dispatch(clearUser());
    return { success: true };
  } catch (error) {
    console.warn("Logout API failed, clearing state anyway", error);
    dispatch(logout());
    dispatch(clearUser());
    return { success: false, error };
  }
};
