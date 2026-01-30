import { useEffect, useMemo, useState } from "react";
import AdminPageLayout from "../../components/layout/AdminPageLayout";
import DataTable, { type Column } from "../../components/admin/DataTable/DataTable";
import Pagination from "../../components/admin/DataTable/Pagination";
import Modal from "../../components/ui/Modal";
import { showSuccess, showError } from "../../utils/toast";
import { searchByKeys } from "../../utils/adminSearch";
import {
  adminGetUsers,
  adminToggleBlock,
  adminToggleRole,
} from "../../api/admin.api";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "student" | "instructor";
  isBlocked: boolean;
}

const PAGE_SIZE = 5;

const UserManagement = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await adminGetUsers();
        setUsers(data.users); 
      } catch (err: unknown) {
        showError(getErrorMessage(err) || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // filters
  const [search, setSearch] = useState("");
  const searchableKeys = useMemo<(keyof IUser)[]>(() => ["name", "email"], []);

  const [roleFilter, setRoleFilter] = useState<"" | IUser["role"]>("");
  const [statusFilter, setStatusFilter] = useState<"" | "blocked" | "active">("");
  const [sortOrder, setSortOrder] = useState<"" | "nameAsc" | "nameDesc">("");
  const [page, setPage] = useState(1);

  // Reset page when filters/search change
  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter, sortOrder]);

  // filter + sort
  const filteredUsers = useMemo(() => {
    let result = searchByKeys(users, search, searchableKeys);

    if (roleFilter) result = result.filter((u) => u.role === roleFilter);
    if (statusFilter)
      result = result.filter((u) =>
        statusFilter === "blocked" ? u.isBlocked : !u.isBlocked
      );

    if (sortOrder === "nameAsc")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "nameDesc")
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));

    return result;
  }, [users, search, roleFilter, statusFilter, sortOrder, searchableKeys]);

  // pagination
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );
  
  const [actionUser, setActionUser] = useState<IUser | null>(null);
  const [actionType, setActionType] = useState<"block" | "role" | null>(null);

  // table columns
  const columns: Column<IUser>[] = [
    {
      key: "user",
      header: "User",
      render: (u) => (
        <div>
          <p className="font-medium">{u.name}</p>
          <p className="text-xs text-gray-500">{u.email}</p>
        </div>
      ),
    },
    { key: "role", header: "Role", render: (u) => u.role },
    {
      key: "changeRole",
      header: "Change Role",
      render: (u) => (
        <button
          onClick={() => {
            setActionUser(u);
            setActionType("role");
          }}
          className="text-purple-600 text-sm"
        >
          Switch
        </button>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (u) => (
        <span className={`text-sm ${u.isBlocked ? "text-red-600" : "text-green-600"}`}>
          {u.isBlocked ? "Blocked" : "Active"}
        </span>
      ),
    },
    {
      key: "changeStatus",
      header: "Change Status",
      render: (u) => (
        <button
          onClick={() => {
            setActionUser(u);
            setActionType("block");
          }}
          className="text-blue-600 text-sm"
        >
          {u.isBlocked ? "Unblock" : "Block"}
        </button>
      ),
    },
  ];

  // confirm action
  const handleConfirm = async () => {
    if (!actionUser || !actionType) return;

    setActionLoading(true);

    try {
      let updatedUser;

      if (actionType === "block") {
        const { data } = await adminToggleBlock(actionUser._id);
        updatedUser = data.user;
        showSuccess("User status updated");
      }

      if (actionType === "role") {
        const { data } = await adminToggleRole(actionUser._id);
        updatedUser = data.user;
        showSuccess("User role updated");
      }

      if (updatedUser) {
        setUsers((prev) =>
          prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
        );
      }
    } catch (err: unknown) {
      showError(getErrorMessage(err) || "Action failed");
    } finally {
      setActionLoading(false);
      setActionUser(null);
      setActionType(null);
    }
  };

  return (
    <AdminPageLayout
      title="User Management"
      search={
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          className="border px-3 py-2 rounded-md"
        />
      }
      filters={
        <>
          <select value={roleFilter}  
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRoleFilter(e.target.value as "" | IUser["role"]) } 
          className="border px-3 py-2 rounded-md">
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <select value={statusFilter} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "" | "blocked" | "active")}
          className="border px-3 py-2 rounded-md">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

          <select value={sortOrder} 
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortOrder(e.target.value as "" | "nameAsc" | "nameDesc")}
          className="border px-3 py-2 rounded-md">
            <option value="">Sort</option>
            <option value="nameAsc">Name A–Z</option>
            <option value="nameDesc">Name Z–A</option>
          </select>
        </>
      }
    >
      <DataTable
        columns={columns}
        data={paginatedUsers}
        emptyState={
          loading ? (
            <div className="p-6 text-center text-gray-500">Loading users...</div>
          ) : (
            <div className="p-6 text-center text-gray-500">No users found</div>
          )
        }
      />

      <div className="mt-20">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <Modal
        isOpen={!!actionUser}
        title="Confirm Action"
        description={
          actionType === "block"
            ? `Are you sure you want to ${actionUser?.isBlocked ? "unblock" : "block"} this user?`
            : "Are you sure you want to switch this user's role?"
        }
        confirmText={actionLoading ? "Processing..." : "Confirm"}
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => {
          setActionUser(null);
          setActionType(null);
        }}
      />
    </AdminPageLayout>
  );
};

export default UserManagement;
