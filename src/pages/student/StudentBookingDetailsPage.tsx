import { useParams, useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import StudentBookingDetailsContent from "../../components/student/StudentBookingDetailsContent";
import EmptyState from "../../components/ui/EmptyState";
import type { CancelBookingPayload } from "../../types/cancelBookingPayload";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";
import { cancelBookingApi, getStudentBookedSessionsApi, getStudentBookingByIdApi } from "../../api/student.api";
import { addOrUpdateStudentBooking, setStudentBookings } from "../../features/booking/bookingSlice";
import { showError, showSuccess } from "../../utils/toast";

// interface Props {
//   onCancelBooking?: (payload: CancelBookingPayload) => void;
// }

const StudentBookingDetailsPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentBookings } = useAppSelector((s) => s.bookings);
  const booking = studentBookings.find((b) => b._id === bookingId); //for search cases we need to fetch the booking details from backend since the bookings will be null
  const [loading, setLoading] = useState(false);
  const [cancelPayload, setCancelPayload] = useState<CancelBookingPayload | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // FETCH ONLY IF NOT IN STORE
  useEffect(() => {
    if (!bookingId || booking) return;

    let mounted = true;

    const fetchBooking = async () => {
      setLoading(true);

      try {
        const res = await getStudentBookingByIdApi(bookingId);
        if (!mounted) return;
        dispatch(addOrUpdateStudentBooking(res.data.booking));
      } catch {
        showError("Failed to load booking details");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBooking();

    return () => {
      mounted = false;
    };
  }, [bookingId, booking, dispatch]);

  if (loading && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading booking details...
      </div>
    );
  }

  if (!booking) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="Session not found"
        description="The session you are looking for does not exist."
      />
    );
  }

  // Called by child
  const handleCancelClick = (payload: CancelBookingPayload) => {
    setCancelPayload(payload);
    setIsCancelModalOpen(true);
  };

  const confirmCancelBooking = async () => {
    if (!cancelPayload) return;

    try {
      await cancelBookingApi(cancelPayload);
      showSuccess("Session cancelled successfully");

      const res = await getStudentBookedSessionsApi("booked");
      dispatch(setStudentBookings(res.data.bookings));

      navigate(-1);
    } catch {
      showError("Failed to cancel session");
    } finally {
      setCancelPayload(null);
      setIsCancelModalOpen(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 max-w-4xl mx-auto">
        <StudentBookingDetailsContent
          booking={booking}
          onBack={() => navigate(-1)}
          onJoin={(id) => navigate(`/user/video/session/${id}`)}
          onCancel={handleCancelClick} 
        />
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

export default StudentBookingDetailsPage;
