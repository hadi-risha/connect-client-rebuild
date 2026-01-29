import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/toast";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/student/payment/success`,
      },
    });

    if (error) {
      showError(error.message || "Payment failed");
      navigate("/student/payment/failed");
    }
  };

  return (

    <div className="min-h-screen flex items-start justify-center bg-gray-50 pt-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold text-center">Payment</h2>

        {/* Stripe PaymentElement */}
        <div className="border p-4 rounded bg-gray-50">
          <PaymentElement />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
