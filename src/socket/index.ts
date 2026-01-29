// socket instance (ONLY io())

import { io } from "socket.io-client";
import { config } from "../config";

export const socket = io(config.apiSocketUrl, {
  withCredentials: true,
  autoConnect: false,
});


//connect socketio after login(AuthInitializer)
