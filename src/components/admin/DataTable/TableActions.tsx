interface TableActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onToggle?: () => void;
  toggleLabel?: string;
}

const TableActions = ({
  onEdit,
  onDelete,
  onToggle,
  toggleLabel,
}: TableActionsProps) => {
  return (
    <div className="flex gap-2">
      {onEdit && (
        <button
          onClick={onEdit}
          className="text-blue-600 text-sm"
        >
          Edit
        </button>
      )}

      {onToggle && (
        <button
          onClick={onToggle}
          className="text-yellow-600 text-sm"
        >
          {toggleLabel}
        </button>
      )}

      {onDelete && (
        <button
          onClick={onDelete}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default TableActions;
