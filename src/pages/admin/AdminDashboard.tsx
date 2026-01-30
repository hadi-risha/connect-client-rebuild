import { useEffect, useState } from "react";
import AdminPageLayout from "../../components/layout/AdminPageLayout";
import { getDashboardApi } from "../../api/admin.api";
import { showError } from "../../utils/toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { DashboardData, RecentBooking } from "../../types/adminDashboard";

const COLORS = ["#4f46e5", "#16a34a"];

interface CardProps {
  title: string;
  value: number;
}

interface RecentBookingsProps {
  bookings: RecentBooking[];
}

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardApi({ start, end });
      setData(res.data.data);
    } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch dashboard";
        showError(message);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!data) return <p className="p-6 text-center">No data available</p>;

  const { userStats, bookingStats, sessionStats, recentBookings } = data;
  const userChart = [
    { name: "Students", value: userStats.students },
    { name: "Instructors", value: userStats.instructors },
  ];

  return (
    <AdminPageLayout title="Admin Dashboard">
      {/* FILTERS */}
      <div className="flex gap-4 mb-6">
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="border p-2 rounded" />
        <button onClick={fetchDashboard} className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer">
          Apply
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Total Users" value={userStats.totalUsers} />
        <Card title="Bookings" value={bookingStats.totalBookings} />
        <Card title="Sessions" value={sessionStats.totalSessions} />
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* USER PIE CHART */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={userChart} dataKey="value" nameKey="name" outerRadius={80} label>
                {userChart.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BOOKING STATUS */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-4">Booking Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: "Completed", value: bookingStats.completed },
              { name: "Cancelled", value: bookingStats.cancelled },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT BOOKINGS TABLE */}
      <RecentBookings bookings={recentBookings} />
    </AdminPageLayout>
  );
};

const Card = ({ title, value }: CardProps) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <h3 className="text-lg font-medium">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const RecentBookings = ({ bookings }: RecentBookingsProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-500 uppercase text-xs tracking-wider">
            <th className="px-6 py-3">Student</th>
            <th className="px-6 py-3">Instructor</th>
            <th className="px-6 py-3">Session</th>
            <th className="px-6 py-3">Booked At</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr
              key={b._id}
              className="bg-gray-50 hover:bg-gray-100 transition rounded-lg shadow-sm"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {b.studentId?.name ?? "—"}
              </td>
              <td className="px-6 py-4 text-gray-700">
                {b.instructorId?.name ?? "—"}
              </td>
              <td className="px-6 py-4 text-gray-700">
                {b.sessionId?.title}
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(b.bookedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


export default AdminDashboard;
