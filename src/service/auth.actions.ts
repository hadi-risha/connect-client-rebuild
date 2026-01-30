// logout api call from component(component -> action -> api -> axios)
import { logoutApi } from "../api/userAuth.api";
import { logout } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";

export const performLogout = async (dispatch: AppDispatch) => {
  try {
    await logoutApi();
    dispatch(logout());
    return { success: true };
  } catch (error) {
    console.warn("Logout API failed, clearing state anyway", error);
    dispatch(logout());
    return { success: false, error };
  }
};
