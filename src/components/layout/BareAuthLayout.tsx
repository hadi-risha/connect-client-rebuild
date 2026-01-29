// authenticated but HOME ONLY
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import Header from "../common/Header";

const BareAuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <Header />

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default BareAuthLayout;
