// axios instance + interceptors
// What interceptor is for 
// NOT for page refresh
// ONLY for expired access token during API calls

import axios from "axios";
import { config } from "../config";
import {store} from "../app/store";
import { setAuth, logout } from "../features/auth/authSlice";
import { StatusCode } from "../constants/statusCodes";

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true // important for refresh cookie
});

// attach access token to every request
api.interceptors.request.use((req) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// handle expired access token
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === StatusCode.UNAUTHORIZED) {
      try {
        const res = await axios.post(
          `${config.apiBaseUrl}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        store.dispatch(
          setAuth({
            accessToken: res.data.accessToken,
            user: res.data.user,
            isAuthenticated: true
          })
        );

        err.config.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(err.config);
      } catch {
        store.dispatch(logout());
      }
    }
    return Promise.reject(err);
  }
);

export default api;
