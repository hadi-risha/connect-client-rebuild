import { useNavigate } from "react-router-dom";
import ChatSearchBar from "./SearchBar";
import { Plus } from "lucide-react";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
}

export const NewChatHeader = ({ query, onQueryChange }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border-b">
      {/* HEADER ROW */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">New Chat</h2>

        <button
          onClick={() => navigate("/user/chat/create-group")}
          className="text-blue-600 flex items-center gap-2 text-sm p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition cursor-pointer"
        >
          <Plus size={16} />
          Create group
        </button>
      </div>

      {/* SEARCH */}
      <ChatSearchBar
        value={query}
        onChange={onQueryChange}
        placeholder="Search users or groups"
      />
    </div>
  );
};
