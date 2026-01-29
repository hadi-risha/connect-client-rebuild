export interface UserPreview {
  _id: string;
  name: string;
  role: string;
  profilePicture?: {
    key?: string;
    url?: string;
  };
}

export interface SessionPreview {
  _id: string;
  title: string;
  introduction: string;
  description: string;
  bulletPoints?: string[];
  coverPhoto?: {
    key?: string;
    url?: string;
  };
  duration: number;
  fees: number;
}

export interface StudentBooking {
  _id: string;
  bookedDate: string;
  timeSlot: string;
  endTime: string;
  status: string;
  concerns?: string;
  instructor: UserPreview;
  session: SessionPreview;
  meetingId?: string;
  amountPaid: number;
  currency: string;
  isRefunded: boolean;
  refundedAmount?: number;
  refundStatus?: "pending" | "succeeded" | "failed";
  cancellation?: {
    cancelledBy: 'student' | 'instructor';
    cancelledAt: string;  //in backend its date 
    reason?: string;
  };
}


export interface InstructorStudentBooking {
  student: UserPreview;
  status: string;
  concerns?: string;
  amountPaid: number;
  currency: string;
  isRefunded: boolean;
  refundedAmount?: number;
  cancellation?: {
    cancelledBy: 'student' | 'instructor';
    cancelledAt: string; 
    reason?: string;
  };
}

export interface InstructorBooking {
  _id: string;
  bookedDate: string;
  timeSlot: string;
  endTime: string;
  status: string; // overall slot status 
  session: SessionPreview;
  meetingId?: string;

  // all students who booked this slot
  students: InstructorStudentBooking[];
  totalStudents: number;
}


export interface BookingState {
  studentBookings: StudentBooking[];
  instructorBookings: InstructorBooking[];

  loading: boolean;
  error?: string;
}
