import { Ghost } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const NotFound = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);

  const goBackHome = () => {
    if (!user) return navigate("/");

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
    ? "Go to Homepage"
    : user.role === "admin"
    ? "Go to Dashboard"
    : "Go to Home";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500/10 p-4 rounded-full">
            <Ghost className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>

        {/* Message */}
        <p className="text-slate-400 mb-6">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        {/* Button */}
        <button
          onClick={goBackHome}
          className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium shadow"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default NotFound;
