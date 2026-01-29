import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Session } from "../session/session.types";

interface SessionsState {
  list: Session[];
  loading: boolean;
}

const initialState: SessionsState = {
  list: [],
  loading: false,
};

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setSessions(state, action: PayloadAction<Session[]>) {
      state.list = action.payload;
    },
    updateSession(state, action: PayloadAction<Session>) {
      const idx = state.list.findIndex(s => s._id === action.payload._id);
      if (idx !== -1) state.list[idx] = action.payload;
    },
    removeSession(state, action: PayloadAction<string>) {
      state.list = state.list.filter(s => s._id !== action.payload);
    },
  },
});

export const {
  setSessions,
  updateSession,
  removeSession,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
