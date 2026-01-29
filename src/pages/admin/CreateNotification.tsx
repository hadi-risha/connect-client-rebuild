import { useState } from "react";
import { createNotificationApi } from "../../api/admin.api";
import NotificationForm from "../../components/admin/NotificationForm";
import AdminPageLayout from "../../components/layout/AdminPageLayout";
import { useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../../utils/toast";

const CreateNotification = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  return (
    <AdminPageLayout title="Create Notification">
      {apiError && (
        <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-md">
          {apiError}
        </div>
      )}

      <NotificationForm
        submitLabel="Create"
        setApiError={setApiError}
        onSubmit={async (data) => {
          try {
            await createNotificationApi(data);
            showSuccess("Notification created successfully");
            navigate("/admin/notifications");
          } catch (err: any) {
            showError(err.response?.data?.message || "Failed to create");
            throw err;
          }
        }}
      />
    </AdminPageLayout>
  );
};

export default CreateNotification;
