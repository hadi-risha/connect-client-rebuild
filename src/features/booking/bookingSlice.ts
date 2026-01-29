import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, StudentBooking } from "./booking.types";

const initialState: BookingState = {
  studentBookings: [],
  instructorBookings: [],
  loading: false,
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setStudentBookings(state, action) {
      state.studentBookings = action.payload;
    },
    // fetch single booking
    addOrUpdateStudentBooking(state, action: PayloadAction<StudentBooking>) {
      const index = state.studentBookings.findIndex(
        (b) => b._id === action.payload._id
      );

      if (index !== -1) {
        state.studentBookings[index] = action.payload;
      } else {
        state.studentBookings.push(action.payload);
      }
    },

    setInstructorBookings(state, action) {
      state.instructorBookings = action.payload;
    },
    clearBookings(state) {
      state.studentBookings = [];
      state.instructorBookings = [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setStudentBookings,
  addOrUpdateStudentBooking, 
  setInstructorBookings,
  clearBookings,
  setLoading,
} = bookingSlice.actions;

export default bookingSlice.reducer;
