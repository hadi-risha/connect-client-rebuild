import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-6">

      {/* prev Button */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={18} />
      </button>

      {/* page info */}
      <span className="text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      {/* next button */}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}
