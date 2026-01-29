import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ChatList } from "./ChatList";
import { useAppSelector } from "../../../hooks/redux";
import { Plus } from "lucide-react";

export const ChatSidebar = () => {
  const chats = useAppSelector(state => state.chat.chats);
  const currentUser = useAppSelector(state => state.user.user);

  const [search, setSearch] = useState("");

  /* FILTER LOGIC */
  const filteredChats = useMemo(() => {
    if (!search.trim()) return chats;

    const term = search.toLowerCase();

    return chats.filter(chat => {
      if (chat.type === "group") {
        return chat.name?.toLowerCase().includes(term);
      }

      const otherUser = chat.members.find(
        m => m._id !== currentUser?._id
      );

      return (
        otherUser?.name?.toLowerCase().includes(term) ||
        otherUser?.email?.toLowerCase().includes(term)
      );
    });
  }, [search, chats, currentUser]);

  const showSearch = chats.length > 0;

  return (
    <aside className="w-80 border-r flex flex-col bg-white">
  <div className="p-4 border-b space-y-3">
    
    {/* HEADER ROW */}
    <div className="flex items-center justify-between">
      <p className="font-semibold text-lg">Messages</p>

      <Link
        to="/user/chat/new"
        className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
      >
        <Plus className="w-5 h-5 text-blue-600" />
      </Link>
    </div>

    {/* SEARCH BAR */}
    {showSearch && (
      <input
        type="text"
        placeholder="Search chats..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>

  <ChatList chats={filteredChats} />
</aside>
  );
};
