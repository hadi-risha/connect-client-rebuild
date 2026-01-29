export interface CancelBookingPayload {
  bookingId: string;
  sessionId: string;
  instructorId: string;
  amountPaid: number;
  currency: string;
}
