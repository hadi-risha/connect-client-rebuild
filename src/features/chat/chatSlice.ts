import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatRoom, Message } from "./chat.types";

interface ChatState {
  chats: ChatRoom[];
  selectedChat: ChatRoom | null;
  messages: Message[];
  typingUsers: string[];
  onlineUsers: string[];
  replyToMessage: Message | null;
}

const initialState: ChatState = {
  chats: [],
  selectedChat: null,
  messages: [],
  typingUsers: [],
  onlineUsers: [],
  replyToMessage: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {

    // chats
    setChats(state, action: PayloadAction<ChatRoom[]>) {
      state.chats = action.payload;
    },

    updateChat(state, action: PayloadAction<ChatRoom>) {
      const index = state.chats.findIndex(
        c => c._id === action.payload._id
      );
      if (index !== -1) {
        state.chats[index] = action.payload;
      }
    },
    selectChat(state, action: PayloadAction<ChatRoom | null>) {
      state.selectedChat = action.payload;
      state.messages = [];
      state.typingUsers = [];
    },
    removeChat(state, action: PayloadAction<string>) {
      state.chats = state.chats.filter(c => c._id !== action.payload);

      if (state.selectedChat?._id === action.payload) {
        state.selectedChat = null;
        state.messages = [];
      }
    },


    // messages
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload.slice().reverse();
    },
    addMessage(state, action: PayloadAction<Message>) {
      const message = action.payload;

      // add message to message list
      state.messages.push(message);

      // find chat
      const chatIndex = state.chats.findIndex(
        c => c._id === message.chatRoom
      );
      if (chatIndex === -1) return;

      const chat = state.chats[chatIndex];
      // update lastMessage
      chat.lastMessage = message;

      // move chat to top
      state.chats.splice(chatIndex, 1);
      state.chats.unshift(chat);
    },
    deleteMessage(state, action: PayloadAction<string>) {
      const msg = state.messages.find(m => m._id === action.payload);
      if (msg) {
        msg.isDeleted = true;
        msg.content = "Message deleted";
      }
    },


    // reactions
    updateReaction(
      state,
      action: PayloadAction<{
        messageId: string;
        emoji: string;
        users: string[];
      }>
    ) {
      const msg = state.messages.find(
        m => m._id === action.payload.messageId
      );
      if (!msg) return;

      const reaction = msg.reactions.find(
        r => r.emoji === action.payload.emoji
      );

      if (reaction) {
        reaction.users = action.payload.users;
      } else {
        msg.reactions.push({
          emoji: action.payload.emoji,
          users: action.payload.users,
        });
      }
    },


    // read receipts
    markChatRead(
      state,
      action: PayloadAction<{
        chatRoomId: string;
        userId: string;
        messageId: string;
      }>
    ) {
      const chat = state.chats.find(
        c => c._id === action.payload.chatRoomId
      );
      if (!chat) return;

      if (!chat.lastRead) chat.lastRead = [];

      const existing = chat.lastRead.find(
        r => r.user === action.payload.userId
      );

      if (existing) {
        existing.message = action.payload.messageId;
        existing.readAt = new Date().toISOString();
      } else {
        chat.lastRead.push({
          user: action.payload.userId,
          message: action.payload.messageId,
          readAt: new Date().toISOString(),
        });
      }
    },


    // typing
    userTyping(state, action: PayloadAction<string>) {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },
    userStopTyping(state, action: PayloadAction<string>) {
      state.typingUsers = state.typingUsers.filter(
        id => id !== action.payload
      );
    },


    // online
    userOnline(state, action: PayloadAction<string>) {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },
    userOffline(state, action: PayloadAction<string>) {
      state.onlineUsers = state.onlineUsers.filter(
        id => id !== action.payload
      );
    },


    // reply
    setReplyTo(state, action: PayloadAction<Message | null>) {
      state.replyToMessage = action.payload;
    },
    clearReplyTo(state) {
      state.replyToMessage = null;
    },
  },
});

export const {
  setChats,
  updateChat,
  selectChat,
  removeChat,

  setMessages,
  addMessage,
  deleteMessage,

  updateReaction,
  markChatRead,

  userTyping,
  userStopTyping,

  userOnline,
  userOffline,

  setReplyTo,
  clearReplyTo,
} = chatSlice.actions;

export default chatSlice.reducer;
