import { useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import EmptyState from "../../components/ui/EmptyState";
import BookingCard from "../../components/student/BookingCard";
import Modal from "../../components/ui/Modal";
import { cancelBookingApi, getStudentBookedSessionsApi } from "../../api/student.api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setStudentBookings } from "../../features/booking/bookingSlice";
import type { CancelBookingPayload } from "../../types/cancelBookingPayload";
import { showSuccess, showError } from "../../utils/toast";

const StudentBookedSessions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentBookings } = useAppSelector((s) => s.bookings);
  const [cancelPayload, setCancelPayload] = useState<CancelBookingPayload | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  useEffect(() => {
    getStudentBookedSessionsApi("booked").then((res) =>
      dispatch(setStudentBookings(res.data.bookings))
    );
  }, [dispatch]);

  const handleCancelClick = (payload: CancelBookingPayload) => {
    setCancelPayload(payload);
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = async () => {
    if (!cancelPayload) return;

    try {
      await cancelBookingApi(cancelPayload);
      showSuccess("Booking cancelled successfully");

      const res = await getStudentBookedSessionsApi("booked");
      dispatch(setStudentBookings(res.data.bookings));
    } catch {
      showError("Failed to cancel booking");
    } finally {
      setIsCancelModalOpen(false);
      setCancelPayload(null);
    }
  };

  if (!studentBookings.length) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="No booked sessions"
        description="You haven’t booked any upcoming sessions yet."
      />
    );
  }

  return (
    <>
      <div className="min-h-screen px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Booked Sessions</h1>
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {studentBookings.map((booking) => {
              return (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onViewDetails={(id) =>
                    navigate(`/student/bookings/${id}`)
                  }
                  onJoin={() =>
                    navigate(`/user/video/session/${booking._id}`)
                  }
                  onCancel={handleCancelClick}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCancelModalOpen}
        title="Cancel Session"
        description="Are you sure you want to cancel this session? The amount will be refunded."
        confirmText="Yes, Cancel"
        cancelText="No"
        onConfirm={confirmCancelBooking}
        onCancel={() => {
          setIsCancelModalOpen(false);
          setCancelPayload(null);
        }}
      />
    </>
  );
};

export default StudentBookedSessions;
