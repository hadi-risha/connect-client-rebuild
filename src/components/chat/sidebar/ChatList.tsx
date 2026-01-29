import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { ChatListItem } from "./ChatListItem";
import { selectChat } from "../../../features/chat/chatSlice";
import type { ChatRoom } from "../../../features/chat/chat.types";

type Props = {
  chats: ChatRoom[];
};

export const ChatList = ({ chats }: Props) => {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector(state => state.chat.selectedChat);

  if (!chats.length) {
    return (
      <div className="p-4 text-sm text-gray-500">
        No conversations found
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map(chat => (
        <ChatListItem
          key={chat._id}
          chat={chat}
          active={selectedChat?._id === chat._id}
          onClick={() => dispatch(selectChat(chat))}
        />
      ))}
    </div>
  );
};

