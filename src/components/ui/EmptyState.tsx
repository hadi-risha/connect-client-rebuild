// fallback componenet
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const EmptyState = ({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      
      {/* ICON */}
      {icon && (
        <div className="mb-4 text-gray-400">
          {icon}
        </div>
      )}

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-gray-800">
        {title}
      </h2>

      {/* DESCRIPTION */}
      {description && (
        <p className="mt-2 max-w-md text-sm text-gray-500">
          {description}
        </p>
      )}

      {/* OPTIONAL ACTION */}
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
