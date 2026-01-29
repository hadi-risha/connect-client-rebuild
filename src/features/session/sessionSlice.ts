import { createSlice } from "@reduxjs/toolkit";
import type { SessionState } from "./session.types";

const initialState: SessionState = {
  current: null,
  loading: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession(state, action) {
      state.current = action.payload.session;
    },
    clearSession(state) {
      state.current = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setSession, clearSession, setLoading } = sessionSlice.actions;
export default sessionSlice.reducer;
