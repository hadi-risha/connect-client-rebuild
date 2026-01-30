// These endpoints apply to every logged-in user, regardless of role.
import api from "./axios";
import { Role } from "../constants/roles";

export type SwitchRolePayload = {
  role: Role;

  instructorProfile?: {
    bio: string;
    expertise: string;
  };

  photo?: {
    key: string;
    url: string;
  };

  removePhoto?: boolean; //User removes existing image, and updated new one, to handle this on backend
};

export const switchRoleApi = (payload: SwitchRolePayload) =>
  api.post("/user/switch-role", payload);

export const updateProfileApi = (payload: unknown) =>
  api.put("/user/profile", payload);

export const getAllSessionsApi = () => 
  api.get("/user/sessions/all");

// here we recieve non-booked and non-archived session
export const getSessionByIdApi = (sessionId: string) => 
  api.get(`/user/session/${sessionId}`);

export const joinVideoCallApi = (bookingId: string) => 
  api.post("/video/join", { bookingId });

export const searchSessionsApi = (q: string) => 
  api.get(`/user/sessions/search?q=${encodeURIComponent(q)}`);

// ai 
export const aiChatApi = (text: string) => 
  api.post("/user/ai/chat", {text}); 
export const getUserAiChatsApi = () => 
  api.get("/user/ai/chats"); 
export const rateAiApi = (rating: number) => 
  api.post("/user/ai/rating", {rating}); 
export const getAiChatApi = (chatId: string) => 
  api.get(`/user/ai/chat/${chatId}`); 
export const aiChatUpdateApi = (chatId: string, question?: string, answer?: string, img?: string) =>
  api.put(`/user/ai/chat/${chatId}`, { question, answer, img });  

export const getUserNotificationsApi = () => 
  api.get("/user/notifications"); 






