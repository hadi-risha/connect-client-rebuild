import { useAppSelector } from "../../../hooks/redux";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "../common/EmptyState";

export const ChatWindow = () => {
  const selectedChat = useAppSelector(state => state.chat.selectedChat);

  if (!selectedChat) {
    return (
      <div className="flex-1">
        <EmptyState text="Select a conversation to start chatting" />
      </div>
    );
  }

  return (
    <section className="flex-1 flex flex-col">
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </section>
  );
};
