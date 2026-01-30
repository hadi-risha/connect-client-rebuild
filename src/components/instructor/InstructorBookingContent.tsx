// single page component - booked/history/cancelled bookings
import { Calendar, Users, Video } from "lucide-react";
import type { InstructorBooking } from "../../features/booking/booking.types";

interface InstructorBookingContentProps {
  booking: InstructorBooking;
  onBack: () => void;
  onJoin?: (bookingId: string) => void;
}

export default function InstructorBookingContent({
  booking,
  onBack,
  onJoin,
}: InstructorBookingContentProps) {
  const { session, status, timeSlot, endTime, totalStudents, students, meetingId } = booking;

  const start = new Date(timeSlot);
  const end = new Date(endTime);

  type BookingStatus = "booked" | "completed" | "cancelled";

  // status color mapping
  const statusColor: Record<BookingStatus, string> = {
    booked: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const upperStatus = status.toUpperCase() as BookingStatus;

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-2xl shadow-lg w-full">
        {/* cover */}
        <img
          src={session.coverPhoto?.url || "/placeholder.png"}
          alt={session.title}
          className="h-48 w-48 rounded-xl object-cover flex-shrink-0"
        />

        {/* content */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">{session.title}</h2>
            <span
              className={`text-sm font-semibold rounded-full px-4 py-1 ${
                statusColor[upperStatus] || "bg-gray-100 text-gray-700"
              }`}
            >
              {upperStatus}
            </span>
          </div>

          <p className="mt-3 text-gray-600">{session.introduction}</p>
          <p className="mt-2 text-gray-600">{session.description}</p>

          {/*meta */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {start.toLocaleDateString()}{" "}
              {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} to{" "}
              {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>

            <span className="flex items-center gap-1">
              <Users size={16} />
              {totalStudents} {totalStudents === 1 ? "student" : "students"}
            </span>

            <span>Instructor: You</span>
          </div>

          <div className="flex gap-6 text-sm mt-2">
            <p><strong>Duration:</strong> {session.duration} mins</p>
            <p><strong>Fees:</strong> ₹{session.fees}</p>
          </div>

          {session.bulletPoints && session.bulletPoints.length > 0 && (
            <ul className="space-y-1 mt-2 list-disc list-inside">
              {session.bulletPoints.map((point, i) => (
                <li key={i} className="text-gray-600">{point}</li>
              ))}
            </ul>
          )}

          {/* students */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Students:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {students.map((s, idx) => {

                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <img
                      src={s.student.profilePicture?.url || "/placeholder.png"}
                      alt={s.student.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1 flex flex-col">
                      <span className="font-medium text-gray-800">{s.student.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 flex justify-end gap-4">
            {upperStatus === "booked" && meetingId && onJoin && (
              <button
                onClick={() => onJoin(booking._id)}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 flex items-center gap-2 cursor-pointer"
              >
                <Video size={16} /> Join Live
              </button>
            )}

            <button
              onClick={onBack}
              className="rounded-lg bg-gray-200 px-6 py-2 text-sm font-medium hover:bg-gray-300 cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


