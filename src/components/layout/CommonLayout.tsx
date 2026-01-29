// CommonLayout → shown for both roles (header, footer, sidebar)
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import RoleSidebar from "../common/RoleNav";

const CommonLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER */}
      <Header />

      {/* BODY */}
      <div className="flex flex-1 pt-16">
        {/* LEFT SIDEBAR */}
        <RoleSidebar />

        {/* PAGE CONTENT */}
        <main className="flex-1 bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default CommonLayout;
