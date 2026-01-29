import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserState } from "./user.types";

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User | null }>) => {
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
