import { useEffect, useState } from "react";
import { getUserNotificationsApi } from "../../api/user.api";
import EmptyState from "../../components/ui/EmptyState";
import { Bell } from "lucide-react";
import dayjs from "dayjs";

interface Notification {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const UserNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await getUserNotificationsApi();
      setNotifications(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading notifications...</p>;

  if (!notifications.length) {
    return (
      <EmptyState
        icon={<Bell size={48} />}
        title="No Notifications Yet"
        description="You're all caught up. New updates from Connect will appear here."
      />
    );
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto p-4 space-y-4">
      {notifications.map((n) => (
        <div
          key={n._id}
          className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
        >
          {/* app logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">
            C
          </div>

          {/* content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">{n.title}</h3>
              <span className="text-xs text-gray-400">
                {dayjs(n.createdAt).fromNow()}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-600">
              {n.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserNotifications;
