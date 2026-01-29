import { NavLink } from "react-router-dom";
import { Role } from "../../constants/roles";
import { useAppSelector } from "../../hooks/redux";
import {
  Home,
  Calendar,
  BookOpen,
  Archive,
  Heart,
  User,
  Bell,
  MessageSquare,
  Cpu,
  Edit,
  Activity,
} from "lucide-react";

const RoleSidebar = () => {
  const auth = useAppSelector((state) => state.auth);

  const studentLinks = [
    { to: "/student/home", label: "Home", icon: Home },
    { to: "/student/sessions", label: "Browse Sessions", icon: Calendar },
    { to: "/student/bookings/booked", label: "Booked Sessions", icon: BookOpen },
    { to: "/student/bookings/history", label: "Session History", icon: Archive },
    { to: "/student/bookings/cancelled", label: "Cancelled Sessions", icon: Activity },
    { to: "/student/sessions/wishlist", label: "Wishlist", icon: Heart },
    { to: "/user/ai/dashboard", label: "Chat Bot", icon: Cpu },
    { to: "/user/chat", label: "Chat", icon: MessageSquare },
    { to: "/student/profile", label: "Profile", icon: User },
    { to: "/student/notifications", label: "Notifications", icon: Bell },
  ];

  const instructorLinks = [
    { to: "/instructor/home", label: "Home", icon: Home },
    { to: "/instructor/sessions", label: "My Sessions", icon: Calendar },
    { to: "/instructor/create-session", label: "Create Session", icon: Edit },
    { to: "/instructor/bookings/upcoming", label: "Upcoming Sessions", icon: Calendar },
    { to: "/instructor/bookings/history", label: "Session History", icon: Archive },
    { to: "/instructor/bookings/cancelled", label: "Cancelled Sessions", icon: Activity },
    { to: "/instructor/sessions/archived", label: "Archived Sessions", icon: Archive },
    { to: "/instructor/sessions/all", label: "Platform Sessions", icon: Calendar },
    { to: "/user/ai/dashboard", label: "Chat Bot", icon: Cpu },
    { to: "/user/chat", label: "Chat", icon: MessageSquare },
    { to: "/instructor/profile", label: "Profile", icon: User },
    { to: "/instructor/notifications", label: "Notifications", icon: Bell },
  ];

  const links =
    auth.user?.role === Role.STUDENT ? studentLinks : instructorLinks;

  // routes that should only be active on exact match
  const exactMatchRoutes = [
    "/student/home",
    "/student/sessions",     
    "/instructor/sessions",
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
      <nav className="p-6 space-y-2">
        <h2 className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-4">
          {auth.user?.role === Role.STUDENT ? "Student Menu" : "Instructor Menu"}
        </h2>

        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={exactMatchRoutes.includes(link.to)}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                  isActive
                    ? "bg-[#2cc58a] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-4 h-4 mr-3" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default RoleSidebar;
