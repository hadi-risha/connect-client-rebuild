import { Video, XCircle, Calendar } from "lucide-react";
import type { StudentBooking } from "../../features/booking/booking.types";
import type { CancelBookingPayload } from "../../types/cancelBookingPayload";

export interface BookingCardProps {
  booking: StudentBooking;

  onViewDetails: (bookingId: string) => void;
  onCancel?: (payload: CancelBookingPayload) => void;
  onJoin?: (bookingId: string) => void;
}

export default function BookingCard({
  booking,
  onViewDetails,
  onCancel,
  onJoin,
}: BookingCardProps) {
  const {
    _id,
    session,
    instructor,
    timeSlot,
    endTime,
    status,
    amountPaid,
    currency,
  } = booking;

  const start = new Date(timeSlot);
  const end = new Date(endTime);

  const handleCancel = () => {
    if (!onCancel) return;

    onCancel({
      bookingId: _id,
      sessionId: session._id,
      instructorId: instructor._id,
      amountPaid,
      currency,
    });
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition p-5 flex gap-4">
      <img
        src={session.coverPhoto?.url || "/placeholder.png"}
        alt={session.title}
        className="h-32 w-32 rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            {session.title}
          </h3>

          <span className="text-xs font-medium rounded-full px-3 py-1 bg-blue-100 text-blue-700">
            {status}
          </span>
        </div>

        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {session.introduction || session.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {start.toLocaleDateString()}{" "}
            {start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            to{" "}
            {end.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          <span>Instructor: {instructor.name}</span>
          <span>₹{session.fees}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <button
            onClick={() => onViewDetails(_id)}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
          >
            View Booking
          </button>

          <div className="flex gap-4">
            {/* join (optional) */}
            {onJoin && (
              <button
                onClick={() => onJoin(_id)}
                title="Join Session"
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <Video size={18} />
              </button>
            )}

            {/* cancel (optional + status based) */}
            {onCancel && status === "booked" && (
              <button
                onClick={handleCancel}
                title="Cancel & Refund"
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <XCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
