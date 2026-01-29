import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/stripe";
import { createPaymentIntentApi } from "../../api/student.api";
import { showError } from "../../utils/toast";
import { useEffect, useState } from "react";
import CheckoutForm from "../../components/student/CheckoutForm";

const ConfirmBooking = () => {
  const { sessionId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!state) {
      navigate(-1);
      return;
    }

    const createIntent = async () => {
      try {
        const res = await createPaymentIntentApi({
          sessionId: sessionId!,
          timeSlot: state.timeSlot,
          selectedDate: state.selectedDate,
          concerns: state.concerns,
        });

        setClientSecret(res.data.clientSecret);
      } catch (err: any) {
        showError(err.response?.data?.message || "Payment failed");
        navigate(-1);
      }
    };

    createIntent();
  }, []);

  if (!clientSecret) return <p>Preparing payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default ConfirmBooking;
