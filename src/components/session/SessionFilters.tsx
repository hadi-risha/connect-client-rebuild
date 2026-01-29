interface Props {
  minPrice: number | null;
  maxPrice: number | null;
  onMinPrice: (v: number | null) => void;
  onMaxPrice: (v: number | null) => void;
  onReset: () => void;
}

export default function SessionFilters({
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-6 items-end">
      <div>
        <label className="text-sm">Min Price</label>
        <input
          type="number"
          className="input w-32"
          value={minPrice ?? ""}
          onChange={e =>
            onMinPrice(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>

      <div>
        <label className="text-sm">Max Price</label>
        <input
          type="number"
          className="input w-32"
          value={maxPrice ?? ""}
          onChange={e =>
            onMaxPrice(e.target.value ? Number(e.target.value) : null)
          }
        />
      </div>

      <button
        onClick={onReset}
        className="ml-auto rounded px-4 py-2 border text-sm hover:bg-gray-100 cursor-pointer"
      >
        Reset Filters
      </button>
    </div>
  );
}
