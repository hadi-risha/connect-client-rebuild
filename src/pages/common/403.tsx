import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const Unauthorized = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const handleRedirect = () => {
    if (!user) return navigate("/login");

    switch (user.role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "student":
        navigate("/student/home");
        break;
      case "instructor":
        navigate("/instructor/home");
        break;
      default:
        navigate("/");
    }
  };

  const buttonText = !user
    ? "Go to Login"
    : user.role === "admin"
    ? "Go to Admin Dashboard"
    : user.role === "student"
    ? "Go to Student Home"
    : "Go to Instructor Home";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8 text-center">
        
        <div className="flex justify-center mb-4">
          <div className="bg-red-500/10 p-4 rounded-full">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">
          403 — Access Denied
        </h1>

        <p className="text-slate-400 mb-6">
          You don’t have permission to view this page.
        </p>

        <button
          onClick={handleRedirect}
          className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
