// socket.emit(...) → actions from UI, send events to server(OUTGOING)
import { socket } from "./index";

// chat
export const joinChatSocket = (chatRoomId: string) => {
  socket.emit("chat:join", { chatRoomId });
};

export const leaveChatSocket = (chatRoomId: string) => {
  socket.emit("chat:leave", { chatRoomId });
};

// Messages
export const sendMessageSocket = (payload: {
  chatRoomId: string;
  type: "text" | "image" | "audio";
  content?: string;
  image?: { url: string };
  audio?: { url: string; duration?: number };
  replyTo?: string;
}) => {
  socket.emit("message:send", payload);
};


export const deleteMessageSocket = (chatRoomId: string, messageId: string) => {
  socket.emit("message:delete", { chatRoomId, messageId });
};

// Reactions
export const reactToMessageSocket = (
  chatRoomId: string,
  messageId: string,
  emoji: string
) => {
  socket.emit("message:react", {
    chatRoomId,
    messageId,
    emoji,
  });
};

// Read
export const markReadSocket = (
  chatRoomId: string,
  messageId: string
) => {
  socket.emit("message:read", {
    chatRoomId,
    messageId,
  });
};

// Typing
export const typingStartSocket = (chatRoomId: string) => {
  socket.emit("typing:start", { chatRoomId });
};

export const typingStopSocket = (chatRoomId: string) => {
  socket.emit("typing:stop", { chatRoomId });
};
