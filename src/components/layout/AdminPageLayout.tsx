import React from "react";

interface AdminPageLayoutProps {
  title: string;
  actions?: React.ReactNode;
  search?: React.ReactNode;
  filters?: React.ReactNode;
  children: React.ReactNode;
}

const AdminPageLayout: React.FC<AdminPageLayoutProps> = ({
  title,
  actions,
  search,
  filters,
  children,
}) => {
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          {title}
        </h1>
        {actions}
      </div>

      {/* TOOLS */}
      {(search || filters) && (
        <div className="flex flex-wrap gap-4">
          {search}
          {filters}
        </div>
      )}

      {/* CONTENT */}
      {children}
    </div>
  );
};

export default AdminPageLayout;
