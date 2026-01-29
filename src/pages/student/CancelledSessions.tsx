import { useNavigate } from "react-router-dom";
import { CalendarCheck } from "lucide-react";
import { useEffect } from "react";
import EmptyState from "../../components/ui/EmptyState";
import BookingCard from "../../components/student/BookingCard";
import { getStudentBookedSessionsApi } from "../../api/student.api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setStudentBookings } from "../../features/booking/bookingSlice";

const StudentCancelledSessions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { studentBookings } = useAppSelector((s) => s.bookings);

  useEffect(() => {
    getStudentBookedSessionsApi("cancelled").then((res) =>
      dispatch(setStudentBookings(res.data.bookings))
    );
  }, [dispatch]);
  

  if (!studentBookings.length) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="No cancelled sessions"
        description="You don’t have any cancelled sessions."
      />
    );
  }

  return (
    <>
      <div className="min-h-screen px-6 py-8">
        <h1 className="text-2xl font-bold mb-4">Past Sessions</h1>
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
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCancelledSessions;
