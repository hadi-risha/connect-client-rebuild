// BookSession → ConfirmBooking → CheckoutForm
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, ArrowLeft, ChevronLeft, ChevronRight, CalendarCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getSessionByIdApi } from "../../api/user.api";
import {
  setSession,
  setLoading,
  clearSession,
} from "../../features/session/sessionSlice";
import { showSuccess, showError, showInfo } from "../../utils/toast";
import { isPastDate, isToday } from "../../utils/calendar";
import EmptyState from "../../components/ui/EmptyState";
import { toggleWishlistApi } from "../../api/student.api";

const formatDateHuman = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const formatTime12h = (iso: string) =>
  new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

const BookSession = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { current: session, loading } = useAppSelector(
    state => state.session
  );

  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [concerns, setConcerns] = useState("");
  const [currentMonth, setCurrentMonth] = useState(today);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSession = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getSessionByIdApi(sessionId);
        dispatch(setSession({ session: response.data.session }));
      } catch {
        showError("Failed to fetch session");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchSession();
    return () => {
      dispatch(clearSession());
    };
  }, [dispatch, sessionId]);

  // calendar
  const daysInMonth = useMemo(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    return new Date(y, m + 1, 0).getDate();
  }, [currentMonth]);

  const startDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const datesArray = Array.from({ length: daysInMonth }, (_, i) =>
    new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1)
  );

  if (loading) return <p className="p-6">Loading...</p>;
  if (!session) {
    return (
      <EmptyState
        icon={<CalendarCheck size={48} />}
        title="Session unavailable"
        description="The session details are no longer available."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* top bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 w-10 h-10 rounded-full border border-gray-500 cursor-pointer
                     hover:bg-blue-100 transition"
        >
          <ArrowLeft size={18} />
        </button>

        <div className="border border-dotted border-rose-500 rounded-lg px-3 py-2">
          <button
            onClick={async () => {
              if (!session?._id) return;

              try {
                await toggleWishlistApi(session._id);

                dispatch(
                  setSession({
                    session: {
                      ...session,
                      isWishlisted: !session.isWishlisted,
                    },
                  })
                );

                if (!session.isWishlisted) {
                  showSuccess("Added to wishlist ❤️");
                } else {
                  showInfo("Removed from wishlist");
                }
              } catch {
                showError("Failed to update wishlist");
              }
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Heart
              className={`h-5 w-5 transition ${
                session.isWishlisted
                  ? "text-rose-500 fill-rose-500"
                  : "text-black fill-none"
              }`}
            />

            <span className="text-sm select-none">
              {session.isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"}
            </span>
          </button>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ---------- LEFT : SESSION DETAILS ---------- */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          {/* Session Image */}
          {session.coverPhoto?.url && (
            <div className="w-full lg:w-1/2 h-44 rounded-lg overflow-hidden">
              <img
                src={session.coverPhoto.url}
                alt={session.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-2xl font-semibold">{session.title}</h1>
          <p className="text-gray-600">{session.introduction}</p>

          <div className="flex gap-6 text-sm">
            <p>
              <strong>Duration:</strong> {session.duration} mins
            </p>
            <p>
              <strong>Fees:</strong> ₹{session.fees}
            </p>
          </div>

          {session.bulletPoints && session.bulletPoints.length > 0 && (
            <ul className="space-y-2 mt-2">
              {session.bulletPoints.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-500">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}


          {/* Concerns */}
          <div>
            <label className="text-sm font-medium">
              Any concerns?{" "}
              <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              rows={4}
              value={concerns}
              onChange={e => setConcerns(e.target.value)}
              className="mt-2 w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
              placeholder="Share anything you'd like the instructor to know..."
            />
          </div>
        </div>

        {/* ---------- RIGHT : DATE & TIME ---------- */}
        <div className="bg-white rounded-xl shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold font-serif">Select a Date & Time</h2>

          {/* Month navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button
              className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-full p-2 transition"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
            >
              <ChevronLeft />
            </button>

            <p className="text-gray-400">
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
            </p>

            <button
              className="text-gray-400 cursor-pointer hover:bg-gray-200 rounded-full p-2 transition"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
            >
              <ChevronRight />
            </button>
          </div>

          {/* Calendar */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(d => (
              <div key={d} className=" text-black">
                {d}
              </div>
            ))}

            {Array(startDay)
              .fill(null)
              .map((_, i) => (
                <div key={i} />
              ))}

            {datesArray.map(date => {
              const disabled = isPastDate(date);
              const selected =
                selectedDate?.toDateString() === date.toDateString();

              return (
                <button
                  key={date.toISOString()}
                  disabled={disabled}
                  onClick={() => {
                    if (isToday(date)) {
                      showInfo("Please select a date from tomorrow onwards");
                      return;
                    }
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={`cursor-pointer p-2 rounded-full transition
                    ${disabled && "text-gray-400 cursor-not-allowed"}
                    ${selected && "bg-[#f3d281] text-black"}
                    ${!disabled && !selected && "hover:bg-blue-50"}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Time slots */}
          {selectedDate && (
            <>
              <h3 className="mt-20 text-gray-600">Available time slots</h3>

              <div className="flex flex-col gap-2">
                {session.timeSlots.map(slot => {
                  const isSelected = selectedTime === slot;

                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        cursor-pointer
                        border
                        rounded
                        py-2
                        transition
                        ${
                          isSelected
                            ? "bg-[#f3d281] text-black font-bold border-blue-600"
                            : "text-blue-700 border-blue-600 hover:bg-blue-50"
                        }
                      `}
                    >
                      {formatTime12h(slot)}
                    </button>
                  );
                })}
              </div>
            </>
          )}


          {/* Selected summary */}
          {selectedDate && selectedTime && (
            <div className="p-4 bg-green-50 rounded-lg text-sm">
              <strong>Selected:</strong>{" "}
              {formatDateHuman(selectedDate)} at{" "}
              {formatTime12h(selectedTime)}
            </div>
          )}

          {/* Continue button */}
          <button
            className="mt-5 w-full cursor-pointer bg-blue-500 text-white py-3 rounded-lg font-medium
                       hover:bg-blue-600 transition"
            onClick={() => {
              if (!selectedDate) {
                showError("Please select a date");
                return;
              }
              if (!selectedTime) {
                showError("Please select a time");
                return;
              }

              if (isToday(selectedDate)) {
                showError("Please select a date from tomorrow onwards");
                return;
              }

              // Extract time from slot
              const time = new Date(selectedTime);

              // Merge date + time
              const combinedDateTime = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                time.getHours(),
                time.getMinutes()
              );

              if (isNaN(combinedDateTime.getTime())) {
                showError("Invalid date/time");
                return;
              }

              navigate(`/student/session/confirm/${session._id}`, {
                state: {
                  selectedDate: selectedDate.toISOString(),       // date only
                  timeSlot: combinedDateTime.toISOString(),       // FULL datetime
                  concerns,
                },
              });

            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookSession;
