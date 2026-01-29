import { Outlet } from "react-router-dom";
import AiChatList from "../common/AiChatList";

const AiDashboardLayout = () => {
  return (
    <div className="w-full min-h-screen bg-[#0e0c16] flex gap-3 pt-5">
      {/* Sidebar */}
      <div className="w-1/4">
        <AiChatList />
      </div>

      {/* Main content */}
      <div className="flex-1 bg-[#12101b] min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AiDashboardLayout;
