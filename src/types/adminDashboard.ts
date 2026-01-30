// --- USER STATS ---
interface UserStats {
  totalUsers: number;
  instructors: number;
  students: number;
}

// --- BOOKING STATS ---
interface BookingStats {
  totalBookings: number;
  completed: number;
  cancelled: number;
}

// --- SESSION STATS ---
interface SessionStats {
  totalSessions: number;
  upcomingSessions: number;
}

// --- RECENT BOOKINGS (populated fields from backend) ---
interface PopulatedUser {
  _id: string;
  name?: string;
}

interface PopulatedSession {
  _id: string;
  title: string;
}

export interface RecentBooking {
  _id: string;
  bookedAt: string;
  studentId: PopulatedUser;
  instructorId: PopulatedUser;
  sessionId: PopulatedSession;
}

// --- FULL DASHBOARD RESPONSE DATA ---
export interface DashboardData {
  userStats: UserStats;
  bookingStats: BookingStats;
  sessionStats: SessionStats;
  recentBookings: RecentBooking[];
}


