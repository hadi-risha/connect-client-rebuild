// socket.on(...) → Redux updates, receive events from server(INCOMING)

import { socket } from "./index";
import { store } from "../app/store";
import {
  addMessage,
  userTyping,
  userStopTyping,
  updateReaction,
  deleteMessage,
  userOnline,
  userOffline,
  markChatRead,
} from "../features/chat/chatSlice";

import type { Message } from "../features/chat/chat.types";

interface ReactionPayload {
  messageId: string;
  reactions: {
    emoji: string;
    users: string[];
  }[];
}

interface ReadPayload {
  chatRoomId: string;
  userId: string;
  messageId: string;
}

export const registerSocketListeners = () => {
  // Messages
  socket.on("message:new", (message: Message) => {
    store.dispatch(addMessage(message));
  });

  socket.on("message:deleted", ({ messageId }: { messageId: string }) => {
    store.dispatch(deleteMessage(messageId));
  });

  // Reactions
  socket.on("message:reaction", (payload: ReactionPayload) => {
    payload.reactions.forEach(r => {
      store.dispatch(
        updateReaction({
          messageId: payload.messageId,
          emoji: r.emoji,
          users: r.users,
        })
      );
    });
  });

  // Typing
  socket.on("typing:start", ({ userId }: { userId: string }) => {
    store.dispatch(userTyping(userId));
  });

  socket.on("typing:stop", ({ userId }: { userId: string }) => {
    store.dispatch(userStopTyping(userId));
  });

  // Read receipts
  socket.on("message:read", (payload: ReadPayload) => {
    store.dispatch(markChatRead(payload));
  });

  // Online
  socket.on("user:online", ({ userId }: { userId: string }) => {
    store.dispatch(userOnline(userId));
  });

  socket.on("user:offline", ({ userId }: { userId: string }) => {
    store.dispatch(userOffline(userId));
  });
};
