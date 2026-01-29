import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  setChats,
  setMessages,
} from "../../features/chat/chatSlice";

import { getMyChatsApi } from "../../api/chat.api";
import { getMessagesApi } from "../../api/message.api";

import { joinChatSocket } from "../../socket/chat.emitters";
import { ChatLayout } from "../../components/chat/layout/ChatLayout";

export const ChatPage = () => {
  const dispatch = useAppDispatch();
  const { selectedChat } = useAppSelector(state => state.chat);

  useEffect(() => {
    getMyChatsApi().then(res => {
      dispatch(setChats(res.data.chats));
    });
  }, []);

  // oad messages + join socket room
  useEffect(() => {
    if (!selectedChat) return;

    getMessagesApi(selectedChat._id).then(res => {
      dispatch(setMessages(res.data.messages));
      joinChatSocket(selectedChat._id); // real-time updates
    });
  }, [selectedChat]);

  return( 
    <div>
    
      <ChatLayout />
    </div>
  
  );
};
