import api from "./axios";

export const getMyChatsApi = () => {
  return api.get("/chat");
};

export const getOrCreateChatApi = (targetUserId: string) => {
  return api.post("/chat/one-to-one", { targetUserId });
};

// get a single chat detail - group/single
export const getChatApi = (chatId: string) => {
  return api.get(`/chat/${chatId}`);
};

export const createGroupChatApi = (payload: {
  name: string;
  description?: string;
  image?: {
    key?: string;
    url?: string;
  };
}) => {
  return api.post("/chat/group", payload);
};

export const updateGroupChatApi = (chatId: string, payload: {
  name?: string;
  description?: string;
  image?: { key?: string; url?: string }; 
  removeOldImage?: boolean;
}) => {
  return api.put(`/chat/group/${chatId}`, payload);
};

export const addGroupMemberApi = (
  chatRoomId: string,
  userIds?: string[]
) => {
  return api.post("/chat/group/add", {
    chatRoomId,
    newUserIds: userIds ?? null, // admin → array, self join → null
  });
};

export const removeGroupMemberApi = (payload: {
  chatRoomId: string;
  userIdToRemove: string;   
}) => {
  return api.post("/chat/group/remove", payload);
};

export const leaveGroupApi = (chatRoomId: string) => {
  return api.post("/chat/group/leave", { chatRoomId });
};

export const deleteGroupApi = (chatId: string) => {
  return api.delete(`/chat/group/${chatId}`);
};

export const discoverUsersApi = (q?: string) =>
  api.get("/chat/discover/users", { params: { q } });

export const discoverGroupsApi = (q?: string) =>
  api.get("/chat/discover/groups", { params: { q } });