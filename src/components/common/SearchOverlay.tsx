// common/SearchOverlay.tsx
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSessionsApi } from "../../api/user.api";

interface Props {
  query: string;
  onClose: () => void;
}

interface SearchResult {
  sessionId: string;
  title: string;
  introduction: string;
  isBooked: boolean;
  bookingId?: string | null;
  redirectTo: string;
}

const SearchOverlay = ({ query, onClose }: Props) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await searchSessionsApi(query)
        if (active) {
          setResults(data.results || []);
        }
      } catch {
        if (active) setError("Failed to fetch results");
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchResults();
    return () => {
      active = false;
    };
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // click outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // highlight helper
  const highlight = (text: string, keyword: string) => {
    if (!keyword) return text;

    const regex = new RegExp(`(${keyword})`, "ig");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-40" onMouseDown={handleOutsideClick}>
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* panel */}
      <div
        ref={panelRef}
        className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] bg-white rounded-lg shadow-lg max-h-[400px] overflow-y-auto"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold">
            Results for "{query}"
          </span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* content */}
        {loading && (
          <div className="p-6 text-center text-gray-500">
            Searching...
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-red-500">
            {error}
          </div>
        )}

        {!loading && !error && results.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No sessions found
          </div>
        )}

        {!loading &&
          !error &&
          results.map((item) => (
            <div
              key={item.sessionId}
              onClick={() => {
                navigate(item.redirectTo);
                onClose();
              }}
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            >
              <h4 className="font-medium">
                {highlight(item.title, query)}
              </h4>

              <p className="text-sm text-gray-600">
                {highlight(item.introduction, query)}
              </p>

              {item.isBooked && (
                <span className="mt-1 inline-block text-xs text-green-600 font-medium">
                  Booked
                </span>
              )}
            </div>
          ))}
      </div>
    </div>,
    document.body
  );
};

export default SearchOverlay;

