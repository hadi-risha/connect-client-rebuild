import type { AppDispatch } from "../app/store";
import { setUser } from "../features/user/userSlice";
import { getProfileApi } from "../api/user.api";
import type { User } from "../features/user/user.types";
import { showError } from "./toast";

interface ProfileResponse {
  user: User;
}

export const setSession = async (dispatch: AppDispatch) => {
  try {
    const res = await getProfileApi();
    const data = res.data as ProfileResponse;
    dispatch(setUser({ user: data.user }));
  } catch (err) {
    console.error("Failed to fetch profile", err);
    showError("Failed to load profile");
  }
};
