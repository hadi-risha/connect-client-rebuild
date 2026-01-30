// flow (component -> api -> axios -> backend)
import type { AiRatingsApiResponse } from '../types/adminAiRating';
import type { DashboardData } from '../types/adminDashboard';
import api from './axios'

export const adminLoginApi = (data: { email: string; password: string }) =>
  api.post('/auth/admin/login', data)

export const adminGetUsers = () =>
  api.get('/admin/users')

export const adminToggleRole = (id: string) =>
  api.patch(`/admin/users/${id}/toggle-role`);

export const adminToggleBlock = (id: string) =>
  api.patch(`/admin/users/${id}/toggle-block`);

export const getAiRatingsApi = () => {
  return api.get<AiRatingsApiResponse>("/admin/ai-ratings");
};

export const getNotificationsApi = () => 
  api.get("/admin/notifications");

export const createNotificationApi = (data: {
  title: string;
  content: string;
}) => api.post("/admin/notifications", data);

export const updateNotificationApi  = (id: string, data: {
  title: string;
  content: string;
}) => api.patch(`/admin/notifications/${id}`, data);

export const toggleNotificationVisibilityApi  = (id: string) =>
  api.patch(`/admin/notifications/${id}/toggle-visibility`);

export const getDashboardApi = (params?: { start?: string; end?: string }) =>
  api.get<{ message: string; data: DashboardData }>("/admin/dashboard", { params });



