import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyState?: React.ReactNode;
}

function DataTable<T>({
  columns,
  data,
  emptyState,
}: DataTableProps<T>) {
  if (!data.length) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full border-collapse">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              row={row}
              columns={columns}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
