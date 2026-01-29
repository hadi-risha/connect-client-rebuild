import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-2">
        Payment Failed ❌
      </h1>

      <p className="text-gray-600 mb-6">
        Please try again.
      </p>

      <button
        onClick={() => navigate("/student/sessions")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                   hover:bg-blue-700 transition"
      >
        Back to Sessions
      </button>
    </div>
  );
}
