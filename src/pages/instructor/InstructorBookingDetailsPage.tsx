import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import InstructorBookingContent from "../../components/instructor/InstructorBookingContent";
import EmptyState from "../../components/ui/EmptyState";
import { CalendarCheck } from "lucide-react";

const InstructorBookingDetailsPage = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { instructorBookings } = useAppSelector((s) => s.bookings);
  const booking = instructorBookings.find((b) => b._id === bookingId);

  if (!instructorBookings.length) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="No sessions found"
        description="There are no data available for this session."
      />
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <InstructorBookingContent
        booking={booking}
        onBack={() => navigate(-1)}
        onJoin={(id) => navigate(`/user/video/session/${id}`)}
      />
    </div>
  );
};

export default InstructorBookingDetailsPage;
