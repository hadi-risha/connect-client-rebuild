import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../lib/stripe";
import { createPaymentIntentApi } from "../../api/student.api";
import { showError } from "../../utils/toast";
import { useEffect, useState } from "react";
import CheckoutForm from "../../components/student/CheckoutForm";
import { getErrorMessage } from "../../utils/getErrorMessage";

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

        console.log("payment intent res", res);
        console.log("payment intent res.data", res.data);
        console.log("payment intent res.data.clientSecret", res.data.clientSecret);

        setClientSecret(res.data.clientSecret);
      } catch (err: unknown) {
        // showError(err.response?.data?.message || "Payment failed");
        showError(getErrorMessage(err) || "Payment failed");
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
