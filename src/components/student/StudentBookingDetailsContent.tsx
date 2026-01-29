// single page content reusing component
import { Calendar, Video, XCircle } from "lucide-react";
import type { StudentBooking } from "../../features/booking/booking.types";
import type { CancelBookingPayload } from "../../types/cancelBookingPayload";

interface Props {
  booking: StudentBooking;
  onBack: () => void;
  onJoin?: (bookingId: string) => void;
  onCancel?: (payload: CancelBookingPayload) => void;
}

export default function StudentBookingDetailsContent({
  booking,
  onBack,
  onJoin,
  onCancel,
}: Props) {
  const {
    _id,
    status,
    session,
    instructor,
    timeSlot,
    endTime,
    concerns,
    amountPaid,
    currency,
    isRefunded,
    refundedAmount,
    cancellation,
  } = booking;

  const upperStatus = status.toUpperCase();
  const start = new Date(timeSlot);
  const end = new Date(endTime);

  const statusColor = {
    BOOKED: "bg-green-100 text-green-800",
    COMPLETED: "bg-blue-100 text-blue-800",
    CANCELLED: "bg-red-100 text-red-800",
  }[upperStatus] || "bg-gray-100 text-gray-700";

  const handleCancel = () => {
    if (!onCancel) return;

    const payload: CancelBookingPayload = {
    bookingId: _id,
    sessionId: session._id,
    instructorId: instructor._id,
    amountPaid,
    currency,
  };

  onCancel(payload);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{session.title}</h2>
        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
          {upperStatus}
        </span>
      </div>

      {/* intro */}
      <p className="mt-2 text-gray-600 font-semibold">{session.introduction}</p>
      <p className="mt-1 text-gray-600">{session.description}</p>

        {session.bulletPoints && session.bulletPoints.length > 0 && (
            <ul className="space-y-1 mt-2 list-disc list-inside">
                {session.bulletPoints.map((point, i) => (
                <li key={i} className="text-gray-600">{point}</li>
                ))}
            </ul>
        )}

      {/* meta */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {start.toLocaleDateString()}{" "}
          {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
          {end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>

        <div className="flex items-center gap-2">
            <strong className="text-gray-700">Instructor:</strong>
            <img
            src={instructor?.profilePicture?.url || "/placeholder.png"}
            alt={instructor.name}
            className="w-6 h-6 rounded-full object-cover"
            />
            <span>{instructor.name}</span>
        </div>

        <p><strong>Duration:</strong> {session.duration} mins</p>
        <p><strong>Fees:</strong> {currency} {amountPaid}</p>

        {concerns && (
          <p><strong>Your concerns:</strong> {concerns}</p>
        )}
      </div>

      {/* refund info (ONLY cancelled) */}
      {upperStatus === "CANCELLED" && (
        <div className="mt-4 bg-red-50 p-4 rounded-lg text-sm">
          <p><strong>Cancelled by:</strong> {cancellation?.cancelledBy}</p>
          <p><strong>Cancelled at:</strong> {new Date(cancellation!.cancelledAt).toLocaleString()}</p>

          {isRefunded && (
            <p className="mt-1 text-green-700">
              Refunded Amount: {currency} {refundedAmount}
            </p>
          )}
        </div>
      )}

      {/* actions */}
      <div className="mt-6 flex justify-end gap-3">
        {upperStatus === "BOOKED" && onJoin && (
          <button
            onClick={() => onJoin(_id)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            <Video size={16} /> Join
          </button>
        )}

        {upperStatus === "BOOKED" && onCancel && (
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-5 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 cursor-pointer"
          >
            <XCircle size={16} /> Cancel Session
          </button>
        )}

        <button
          onClick={onBack}
          className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}
