import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./auth.types";

const initialState: AuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
