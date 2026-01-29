import type { Column } from "./DataTable";

interface Props<T> {
  columns: Column<T>[];
}

function TableHeader<T>({ columns }: Props<T>) {
  return (
    <thead className="bg-gray-100">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
            style={{ width: col.width }}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
