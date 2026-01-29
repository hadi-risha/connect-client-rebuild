import api from "./axios";

// Get messages for a chat room 
export const getMessagesApi = (
  chatRoomId: string,
  limit = 30,
  skip = 0
) => {
  return api.get(
    `/message/${chatRoomId}?limit=${limit}&skip=${skip}`
  );
};

export const deleteMessageApi = (messageId: string) => {
  return api.delete(`/message/${messageId}`);
};
