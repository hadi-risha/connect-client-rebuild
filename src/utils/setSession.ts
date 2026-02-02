// set user data on initial login
import type { AppDispatch } from "../app/store";
import type { User } from "../features/user/user.types";
import { setUser } from "../features/user/userSlice";

export const setSession = (dispatch: AppDispatch, user: User) => {
    console.log("user data in setSession", user)
    dispatch(setUser({ user: user }));
};
