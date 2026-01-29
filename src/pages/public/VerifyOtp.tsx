import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { resendOtpApi, verifyOtpApi } from "../../api/userAuth.api";
import { showSuccess } from "../../utils/toast";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setAuth } from "../../features/auth/authSlice";

const OTP_LENGTH = 6;

const VerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const verifiedRef = useRef(false);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const email = localStorage.getItem("otp_email");
  const expiry = localStorage.getItem("otp_expires_at");

  /* Safety check */
  useEffect(() => {
    if (verifiedRef.current) return;

    if (!email || !expiry) {
      navigate("/register");
    }
  }, [email, expiry, navigate]);

  /* Sync timer with backend expiry */
  useEffect(() => {
    if (!expiry) return;

    const expiresAt = Number(expiry);

    const interval = setInterval(() => {
      const remaining = Math.floor((expiresAt - Date.now()) / 1000);

      if (remaining <= 0) {
        setTimeLeft(0);
        setCanResend(true);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiry]);

  /* Focus first input */
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* VERIFY OTP */
  const handleVerify = async () => {
    if (otp.some((d) => d === "")) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const otpValue = otp.join("");

      const response = await verifyOtpApi({ email: email!, otp: otpValue });

      dispatch(setAuth({
        accessToken: response.data.accessToken,
        user: response.data.user,
        isAuthenticated: true,   
      }));

      verifiedRef.current = true; 

      showSuccess("OTP verified successfully 🎉");

      // SUCCESS → clear storage
      localStorage.removeItem("otp_email");
      localStorage.removeItem("otp_expires_at");

      // Small delay so user sees toast
      setTimeout(() => {
        navigate(`/${response.data.user.role}/home`);
      }, 800);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  /* RESEND OTP */
  const handleResendOtp = async () => {
    if (!email) return;

    try {
      setLoading(true);
      const response = await resendOtpApi({ email });

      const expiresAt = response.data.expiresAt;

      // Update expiry from backend
      localStorage.setItem("otp_expires_at", expiresAt.toString());

      // Reset UI
      setOtp(Array(OTP_LENGTH).fill(""));
      setCanResend(false);
      setError("");

      showSuccess("New OTP sent to your email 📩");
      inputsRef.current[0]?.focus();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to resend OTP");
      } else {
        setError("Failed to resend OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#011321] flex items-center justify-center">
      <div className="bg-[#051e30] w-3/12 p-8 rounded-lg text-center">

        <p className="inline-block border border-gray-500 rounded-md px-3 py-1 text-gray-100 font-mono font-bold text-2xl mb-4">
          C<span className="text-orange-600">o</span>nnect
        </p>

        <p className="text-white text-xl font-semibold mb-2">
          OTP Verification
        </p>

        <p className="text-gray-400 text-sm mb-6">
          Enter the OTP sent to <span className="text-white">{email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg rounded-md
              bg-transparent border border-gray-500
              text-white outline-none focus:border-blue-500"
            />
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-4">
          {!canResend ? (
            <p>
              Resend OTP in{" "}
              <span className="text-white font-semibold">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className="text-blue-500 font-semibold"
            >
              Resend OTP
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading || otp.some((d) => d === "")}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            loading || otp.some((d) => d === "")
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
