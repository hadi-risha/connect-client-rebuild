import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-green-600 mb-2">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Your booking is confirmed.
      </p>

      <button
        onClick={() => navigate("/student/sessions")}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                   hover:bg-blue-700 transition"
      >
        Go to My Sessions
      </button>
    </div>
  );
}
