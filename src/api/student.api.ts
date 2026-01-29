import type { StudentBooking } from "../features/booking/booking.types";
import api from "./axios";
import type { CancelBookingPayload } from "../types/cancelBookingPayload";


export interface CreatePaymentIntentPayload {
  sessionId: string;
  timeSlot: string;      
  selectedDate: string;   
  concerns?: string;
}

export const createPaymentIntentApi = (payload: CreatePaymentIntentPayload) => 
    api.post("/student/create-payment-intent", payload);

export const getStudentBookedSessionsApi = (status: "booked" | "completed" | "cancelled") =>
  api.get<{ bookings: StudentBooking[] }>(`/student/bookings/${status}`);

export const getStudentBookingByIdApi = (bookingId: string) =>
  api.get<{ booking: StudentBooking }>(
    `/student/bookings/details/${bookingId}`
  );

export const cancelBookingApi = (payload: CancelBookingPayload) =>
  api.post("/student/cancel-booking", payload);

export const toggleWishlistApi = (sessionId: string) =>
  api.patch(`/student/wishlist/${sessionId}`);

