import { Calendar, Users, Video } from "lucide-react";
import type { InstructorBooking } from "../../features/booking/booking.types";

interface InstructorBookingCardProps {
  booking: InstructorBooking;
  onViewBookings: (bookingId: string) => void;
  onJoin?: (bookingId: string) => void;
  primaryButtonText?: string;
}

export default function InstructorBookingCard({
  booking,
  onViewBookings,
  onJoin,
  primaryButtonText
}: InstructorBookingCardProps) {
  const {
    _id,
    session,
    timeSlot,
    endTime,
    status,
    totalStudents,
  } = booking;

  const start = new Date(timeSlot);
  const end = new Date(endTime);

  return (
    <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition p-5 flex gap-4">

      {/* Cover */}
      <img
        src={session.coverPhoto?.url || "/placeholder.png"}
        alt={session.title}
        className="h-32 w-32 rounded-xl object-cover"
      />

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Title + Status */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {session.title}
          </h3>

          <span className="text-xs font-medium rounded-full px-3 py-1 bg-green-100 text-green-700">
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {session.introduction || session.description}
        </p>

        {/* Meta */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {start.toLocaleDateString()}{" "}
            {start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {" to "}
            {end.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          <span className="flex items-center gap-1">
            <Users size={14} />
            {totalStudents} {totalStudents === 1 ? "student" : "students"}
          </span>


          <span>Instructor: You</span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <button
            onClick={() => onViewBookings(_id)}
            className=" bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
          >
            {primaryButtonText || "View Bookings"}
          </button>


          {onJoin && (
            <button
              onClick={() => onJoin(_id)}
              title="Join Live Session"
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <Video size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
