import type { Column } from "./DataTable";

interface Props<T> {
  row: T;
  columns: Column<T>[];
}

function TableRow<T>({ row, columns }: Props<T>) {
  return (
    <tr className="border-t hover:bg-gray-50">
      {columns.map((col) => (
        <td
          key={col.key}
          className="px-4 py-3 text-sm text-gray-800"
        >
          {col.render(row)}
        </td>
      ))}
    </tr>
  );
}

export default TableRow;
