import api from "./axios";
import type { Session } from "../features/session/session.types";
import type { InstructorBooking } from "../features/booking/booking.types";

export const restoreSession = (id: string) => 
  api.patch(`/instructor/restore-session/${id}`);

export const createSessionApi = (data: Session) =>
  api.post("/instructor/session", data);

export const getSessionApi = (id: string) =>
  api.get(`/instructor/session/${id}`);

export const getMySessionsApi = () => 
  api.get("/instructor/sessions");

export const getMyArchivedSessionsApi = () => 
  api.get("/instructor/sessions/archived");

export const toggleSessionArchiveApi = (sessionId: string, isArchived: boolean) =>
  api.patch(`/instructor/session/${sessionId}/archive`, { isArchived });

export const updateSessionApi = (id: string, data: Session) =>
  api.patch(`/instructor/session/${id}`, data);

export const getinstructorBookedSessionsApi = (status: "booked" | "completed" | "cancelled") =>
  api.get<{ bookings: InstructorBooking[] }>(
    `/instructor/bookings/${status}`
  );


