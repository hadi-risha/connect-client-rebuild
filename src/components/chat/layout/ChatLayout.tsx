// ChatLayout (page-level layout wrapper)
import { ChatSidebar } from "../sidebar/ChatSidebar";
import { ChatWindow } from "../window/ChatWindow";

export const ChatLayout = () => {
  return (
    <div className="flex min-h-[85vh] w-8/12 mx-auto border border-gray-200 overflow-hidden shadow-2xl shadow-gray-500">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};
