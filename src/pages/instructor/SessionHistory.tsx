import { useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import EmptyState from "../../components/ui/EmptyState";
import { useEffect } from "react";
import { getinstructorBookedSessionsApi } from "../../api/instructor.api";
import { setInstructorBookings } from "../../features/booking/bookingSlice";
import InstructorBookingCard from "../../components/instructor/BookingCard";

const InstructorSessionHistory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { instructorBookings } = useAppSelector((s) => s.bookings);

  useEffect(() => {
    getinstructorBookedSessionsApi("completed").then((res) => {
      dispatch(setInstructorBookings(res.data.bookings));
    });
  }, [dispatch]);

  if (!instructorBookings.length) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="No past sessions"
        description="You don’t have any completed sessions yet."
      />
    );
  }

  return (
  <div className="min-h-screen px-6 py-8">
    <h1 className="text-2xl font-bold mb-4">Past Sessions</h1>
    <div className="mx-auto max-w-7xl px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {instructorBookings.map((booking) => (
          <InstructorBookingCard
            key={booking._id}
            booking={booking}
            onViewBookings={(id) =>
              navigate(`/instructor/booking/${id}`)
            }
            primaryButtonText="View Details"
          />
        ))}
      </div>
    </div>
  </div>
);
};

export default InstructorSessionHistory;
