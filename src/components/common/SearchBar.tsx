// common - Reusable UI used inside layouts
import { useRef, useState } from "react";
import SearchOverlay from "./SearchOverlay";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setOpen(true);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <>
      {/* search bar container */}
      <div className="flex items-center w-[420px] rounded-full bg-[#051e30] border border-gray-400/40 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/40 transition-all duration-200">
        {/* input */}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search sessions..."
          className="flex-1 bg-transparent px-5 py-2.5 text-sm text-white placeholder-gray-400 outline-none"
        />

        {/* clear */}
        {query && (
          <button
            onClick={handleClear}
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            ✕
          </button>
        )}

        {/* search */}
        <button
          onClick={handleSearch}
          className="mr-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white hover:bg-blue-700 active:scale-95 transition"
        >
          Search
        </button>
      </div>

      {/* overlay */}
      {open && (
        <SearchOverlay
          query={query}
          onClose={() => {
            setOpen(false);
            inputRef.current?.blur();
          }}
        />
      )}
    </>
  );
};

export default SearchBar;
