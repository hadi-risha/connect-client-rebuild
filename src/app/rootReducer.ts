// combine reducers
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import sessionReducer from "../features/session/sessionSlice";
import sessionsSlice from "../features/sessions/sessionsSlice";
import bookingSlice from "../features/booking/bookingSlice";
import chatSlice from "../features/chat/chatSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  session: sessionReducer, //for single session(create, edit)
  sessions: sessionsSlice,
  bookings: bookingSlice,
  chat: chatSlice
});