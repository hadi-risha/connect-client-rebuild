import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ChatSearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          bg-gray-100
          px-4
          py-2.5
          pr-10
          text-sm
          rounded-lg
          outline-none
          border border-transparent
          focus:border-blue-300
          focus:bg-white
          transition
        "
      />

      {/* right icon */}
      <Search
        className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
};

export default ChatSearchBar;
