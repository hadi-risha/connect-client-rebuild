import { Outlet } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <AdminHeader />

      {/* BODY */}
      <div className="flex flex-1 pt-16">
        {/* LEFT SIDEBAR */}
        <AdminSidebar />
        {/* <AdminNavbar /> */}

        {/* PAGE CONTENT */}
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;

