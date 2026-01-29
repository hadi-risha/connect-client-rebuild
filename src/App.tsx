import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Role } from "./constants/roles";
import { PublicRoute } from "./routes/UserPublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { RoleRoute } from "./routes/RoleRoute";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import VerifyOtp from "./pages/public/VerifyOtp";
import StudentProfile from "./pages/student/Profile";
import Unauthorized from "./pages/common/403";
import NotFound from "./pages/common/404";
import ForgotPassword from "./pages/public/ForgotPassword";
import ResetPassword from "./pages/public/ResetPassword";
import GoogleCallback from "./pages/public/GoogleCallback";
import CommonLayout from "./components/layout/CommonLayout";
import CreateSession from "./pages/instructor/CreateSession";
import BareAuthLayout from "./components/layout/BareAuthLayout";
import StudentHome from "./pages/student/StudentHome";
import StudentSessions from "./pages/student/AllSessions";
import InstructorProfile from "./pages/instructor/Profile";
import EditSession from "./pages/instructor/EditSession";
import StudentBookedSessions from "./pages/student/BookedSessions";
import StudentSessionHistory from "./pages/student/SessionHistory";
import StudentCancelledSessions from "./pages/student/CancelledSessions";
import Wishlist from "./pages/student/Wishlist";
import MySessions from "./pages/instructor/MySessions";
import InstructorAllSessions from "./pages/instructor/AllSessions";
import InstructorUpcomingSessions from "./pages/instructor/UpcomingSessions";
import InstructorSessionHistory from "./pages/instructor/SessionHistory";
import InstructorCancelledSessions from "./pages/instructor/CancelledSessions";
import ArchivedSessions from "./pages/instructor/ArchivedSessions";
import BookSession from "./pages/student/BookSession";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import PaymentFailed from "./pages/student/PaymentFailed";
import ConfirmBooking from "./pages/student/ConfirmBooking";
import ZegoVideoCall from "./pages/common/ZegoVideoCall";
import InstructorSessionDetails from "./pages/instructor/InstructorSessionDetails";
import InstructorBookingDetailsPage from "./pages/instructor/InstructorBookingDetailsPage";
import StudentBookingDetailsPage from "./pages/student/StudentBookingDetailsPage";
import StudentProfileEdit from "./pages/student/StudentProfileEdit";
import InstructorProfileEdit from "./pages/instructor/ProfileEdit";
import AiDashboardLayout from "./components/layout/AiDashboardLayout";
import AiChatPage from "./pages/common/AiChatPage";
import AiDashboardPage from "./pages/common/AiDashboardPage";
import { ChatPage } from "./pages/common/ChatPage";
import NewChatPage from "./pages/common/NewChatPage";
import CreateGroupPage from "./pages/common/CreateGroupPage";
import AdminLogin from "./pages/public/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/layout/AdminLayout";
import UserManagement from "./pages/admin/UserManagement";
import NotificationManagement from "./pages/admin/NotificationManagement";
import AiRating from "./pages/admin/AiRating";
import CreateNotification from "./pages/admin/CreateNotification";
import UpdateNotification from "./pages/admin/UpdateNotification";
import UserNotifications from "./pages/common/Notifications";
import InstructorHome from "./pages/instructor/InstructorHome";
import ChatLayout from "./components/layout/ChatLayout";
import RootRedirect from "./routes/RootRedirect";

export default function App() {
  return (
  <>
    {/* add toast provider in the root file, so toast works anywhere in this app */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#051e30",
            color: "#fff",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<RootRedirect />} />
        {/* PUBLIC */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>


        {/* AUTHENTICATED */}
        <Route element={<ProtectedRoute />}>

          {/* HOME (NO SIDEBAR LAYOUT) */}
          <Route element={<BareAuthLayout />}>
            <Route element={<RoleRoute roles={[Role.STUDENT]} />}>
              <Route path="/student/home" element={<StudentHome />} />
            </Route>

            <Route element={<RoleRoute roles={[Role.INSTRUCTOR]} />}>
              <Route path="/instructor/home" element={<InstructorHome />} />
            </Route>
          </Route>

          {/* COMMON AUTH ROUTES FOR STUDENT AND INSTRUCTOR */}
          <Route path="/user/video/session/:bookingId" element={<ZegoVideoCall />} /> 

          <Route path="/user/ai" element={<AiDashboardLayout />}>
            <Route path="dashboard" element={<AiDashboardPage />} />
            <Route path="dashboard/chats/:id" element={<AiChatPage />} />
          </Route>
          {/* <Route path="/user/video/session/:bookingId" element={<ZegoVideoCall />} />  */}

          <Route element={<ChatLayout />}>
            <Route path="/user/chat" element={<ChatPage />} /> 
            <Route path="/user/chat/new" element={<NewChatPage />} /> 
            <Route path="/user/chat/create-group" element={<CreateGroupPage />} />
          </Route>


          {/* COMMON LAYOUT - APP PAGES (WITH SIDEBAR) */}
          <Route element={<CommonLayout />}>
            <Route element={<RoleRoute roles={[Role.STUDENT]} />}>
              <Route path="/student/profile" element={<StudentProfile />} />
              <Route path="/student/sessions" element={<StudentSessions />} /> {/* all sessions */}
              <Route path="/student/session/book/:sessionId" element={<BookSession />} />
              <Route path="/student/session/confirm/:sessionId" element={<ConfirmBooking />} />
              <Route path="/student/payment/success" element={<PaymentSuccess />} />
              <Route path="/student/payment/failed" element={<PaymentFailed />} />
              <Route path="/student/bookings/booked" element={<StudentBookedSessions />} />
              <Route path="/student/bookings/history" element={<StudentSessionHistory />} />
              <Route path="/student/bookings/cancelled" element={<StudentCancelledSessions />} />
              <Route path="/student/bookings/:bookingId" element={<StudentBookingDetailsPage />} />
              <Route path="/student/sessions/wishlist" element={<Wishlist />} />
              <Route path="/student/profile/edit" element={<StudentProfileEdit />} />
              <Route path="/student/notifications" element={<UserNotifications />} />          
            </Route>

            <Route element={<RoleRoute roles={[Role.INSTRUCTOR]} />}>
              <Route path="/instructor/profile" element={<InstructorProfile />} />
              <Route path="/instructor/create-session" element={<CreateSession />} />
              <Route path="/instructor/edit-session/:id" element={<EditSession />} />
              <Route path="/instructor/sessions" element={<MySessions />} /> {/* my sessions */}
              <Route path="/instructor/session/:sessionId" element={<InstructorSessionDetails />} />
              <Route path="/instructor/sessions/archived" element={<ArchivedSessions />} />
              <Route path="/instructor/sessions/all" element={<InstructorAllSessions />} />{/* public sessions */}
              <Route path="/instructor/bookings/upcoming" element={<InstructorUpcomingSessions />} />
              <Route path="/instructor/bookings/history" element={<InstructorSessionHistory />} />
              <Route path="/instructor/bookings/cancelled" element={<InstructorCancelledSessions />} />
              <Route path="/instructor/booking/:bookingId" element={<InstructorBookingDetailsPage />} />
              <Route path="/instructor/profile/edit" element={<InstructorProfileEdit />} />
              <Route path="/instructor/notifications" element={<UserNotifications />} />
            </Route>
          </Route>

          {/* ADMIN ROUTES (NO COMMON LAYOUT) */}
          <Route element={<AdminLayout />}>
            <Route element={<RoleRoute roles={[Role.ADMIN]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/notifications" element={<NotificationManagement />} />
              <Route path="/admin/notifications/create" element={<CreateNotification />} />
              <Route path="/admin/notifications/update/:id" element={<UpdateNotification />} />
              <Route path="/admin/ai-rating" element={<AiRating />} />
            </Route>
          </Route>
        </Route>

        {/* ERRORS */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </>
  );
}
