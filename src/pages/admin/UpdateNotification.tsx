import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminPageLayout from "../../components/layout/AdminPageLayout";
import { showError, showSuccess } from "../../utils/toast";
import { getNotificationsApi, updateNotificationApi } from "../../api/admin.api";
import NotificationForm from "../../components/admin/NotificationForm";

const UpdateNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotif = async () => {
      try {  
        const res = await getNotificationsApi();
        const notif = res.data.data.find((n) => n._id === id);
        if (!notif) return showError("Notification not found");
        setData({ title: notif.title, content: notif.content });
      } catch {
        showError("Failed to load notification");
      }
    };
    fetchNotif();
  }, [id]);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <AdminPageLayout title="Update Notification">
      {apiError && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-md">
          {apiError}
        </div>
      )}

      <NotificationForm
        initialData={data}
        submitLabel="Update"
        setApiError={setApiError}
        onSubmit={async (values) => {
          try {
            await updateNotificationApi(id!, values);
            showSuccess("Notification updated successfully");
            navigate("/admin/notifications");
          } catch (err: any) {
            showError(err.response?.data?.message || "Update failed");
            throw err;
          }
        }}
      />
    </AdminPageLayout>
  );
};

export default UpdateNotification;
