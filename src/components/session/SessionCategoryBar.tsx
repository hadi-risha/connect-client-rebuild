import clsx from "clsx";
import { SessionCategory } from "../../constants/sessionCategory";

interface Props {
  active: string;
  onChange: (cat: any) => void;
}

export default function SessionCategoryBar({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange("ALL")}
        className={clsx(
          "px-4 py-2 rounded-full text-sm cursor-pointer",
          active === "ALL"
            ? "bg-blue-600 text-white"
            : "bg-gray-200"
        )}
      >
        All Sessions
      </button>

      {Object.values(SessionCategory).map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm cursor-pointer",
            active === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
