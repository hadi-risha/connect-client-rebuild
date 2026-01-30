import { useEffect, useMemo, useState } from "react";
import AdminPageLayout from "../../components/layout/AdminPageLayout";
import DataTable, { type Column } from "../../components/admin/DataTable/DataTable";
import Pagination from "../../components/admin/DataTable/Pagination";
import Modal from "../../components/ui/Modal";
import EmptyState from "../../components/ui/EmptyState";
import { showSuccess, showError } from "../../utils/toast";
import { searchByKeys } from "../../utils/adminSearch";
import { getNotificationsApi, toggleNotificationVisibilityApi  } from "../../api/admin.api";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface INotification {
  _id: string;
  content: string;
  isVisible: boolean;
  updatedAt: string;
}

const PAGE_SIZE = 5;

const NotificationManagement = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "visible" | "hidden">("");
  const [page, setPage] = useState(1);
  const [actionNotification, setActionNotification] = useState<INotification | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await getNotificationsApi();

        const formatted: INotification[] = res.data.data.map((n: INotification) => ({
          _id: n._id,
          content: n.content,
          isVisible: n.isVisible,
          updatedAt: new Date(n.updatedAt).toLocaleDateString(),
        }));
        setNotifications(formatted);
      } catch (err: unknown) {
        showError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const hasNotifications = notifications.length > 0;

  // search + filter
  const searchableKeys = useMemo<(keyof INotification)[]>(() => ["content"], []);

  const filteredNotifications = useMemo(() => {
    let result = searchByKeys(notifications, search, searchableKeys);

    if (statusFilter) {
      result = result.filter((n) =>
        statusFilter === "visible" ? n.isVisible : !n.isVisible
      );
    }

    return result;
  }, [notifications, search, statusFilter, searchableKeys]);

  // pagination
  const totalPages = Math.ceil(filteredNotifications.length / PAGE_SIZE);
  const paginatedNotifications = filteredNotifications.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // table
  const columns: Column<INotification>[] = [
    {
      key: "content",
      header: "Notification Content",
      render: (n) => (
        <div>
          <p className="font-medium">{n.content}</p>
          <p className="text-xs text-gray-500">Updated: {n.updatedAt}</p>
        </div>
      ),
    },
    // update column
    {
      key: "update",
      header: "Update",
      render: (n) => (
        <button
          onClick={() => navigate(`/admin/notifications/update/${n._id}`)}
          className="p-2 rounded-md hover:bg-gray-100 text-indigo-600"
          title="Edit Notification"
        >
          <Pencil size={16} />
        </button>
      ),
    },
    {
      key: "visibility",
      header: "Visibility Status",
      render: (n) => (
        <span className={`text-sm ${n.isVisible ? "text-green-600" : "text-red-600"}`}>
          {n.isVisible ? "Visible" : "Hidden"}
        </span>
      ),
    },
    {
      key: "changeStatus",
      header: "Change Status",
      render: (n) => (
        <button
          onClick={() => setActionNotification(n)}
          className="text-blue-600 text-sm"
        >
          {n.isVisible ? "Hide" : "Show"}
        </button>
      ),
    },
  ];

  // action
  const handleConfirm = async () => {
    if (!actionNotification) return;

    try {
      await toggleNotificationVisibilityApi (actionNotification._id);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === actionNotification._id ? { ...n, isVisible: !n.isVisible } : n
        )
      );

      showSuccess("Notification updated");
    } catch (err: unknown) {
      showError(getErrorMessage(err));
    } finally {
      setActionNotification(null);
    }
  };

  // consitional ui
  const searchComponent = hasNotifications ? (
    <input
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      placeholder="Search notifications"
      className="border px-3 py-2 rounded-md"
    />
  ) : undefined;

  const filterComponent = hasNotifications ? (
    <select
      value={statusFilter}
      onChange={(e) => {
        setStatusFilter(e.target.value as "" | "visible" | "hidden");
        setPage(1);
      }}
      className="border px-3 py-2 rounded-md"
    >
      <option value="">All Status</option>
      <option value="visible">Visible</option>
      <option value="hidden">Hidden</option>
    </select>
  ) : undefined;

  return (
    <AdminPageLayout title="Notification Management" search={searchComponent} filters={filterComponent}>
      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading notifications...</div>
      ) : !hasNotifications ? (
        <EmptyState
          title="No Notifications Yet"
          description="Create notifications to inform users."
        />
      ) : (
        <>
          <DataTable
            columns={columns}
            data={paginatedNotifications}
            emptyState={<EmptyState title="No matching notifications" />}
          />
          <div className="mt-20">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </>
      )}

      <Modal
        isOpen={!!actionNotification}
        title="Confirm Action"
        description={`Are you sure you want to ${
          actionNotification?.isVisible ? "hide" : "show"
        } this notification?`}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setActionNotification(null)}
      />
    </AdminPageLayout>
  );
};

export default NotificationManagement;
