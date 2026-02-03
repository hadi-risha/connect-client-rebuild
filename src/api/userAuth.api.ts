// API calls  (component -> auth.service -> api -> axios -> backend)
import api from './axios'

export const registerApi = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => api.post("/auth/register", data);

export const verifyOtpApi = (data: {email: string; otp: string}) => 
  api.post("/auth/verify-otp", data);

export const resendOtpApi = (data: { email: string }) =>
  api.post("/auth/resend-otp", data);

export const loginApi = (data: { email: string; password: string }) =>
  api.post('/auth/login', data);

export const forgotPasswordApi = (data: { email: string;}) =>
  api.post('/auth/forgot-password', data)


export const validateResetTokenApi = (data: { token: string; email: string;}) =>
  api.post('/auth/validate-reset-token', data)  

export const resetPasswordApi = (data: { email: string; token: string; password: string; confirmPassword: string;}) =>
  api.post('/auth/reset-password', data)

export const logoutApi = () =>
  api.post('/auth/logout')
