import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { required, minLength, validEmail } from "../../utils/validators";
import { useEffect, useState } from "react";
import { loginApi, resendOtpApi } from "../../api/userAuth.api";
import Modal from "../../components/ui/Modal"; 
import { useAppDispatch } from "../../hooks/redux";
import { setAuth } from "../../features/auth/authSlice";
import { showSuccess } from "../../utils/toast";
import { config } from "../../config";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }
interface LoginFormValues extends Record<string, string> {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [blockedMessage, setBlockedMessage] = useState("");
  const [title, setTitle] = useState("")
  const [showNonverifiedModal, setShowNonverifiedModal] = useState(false);

  // used to clear api error automatically after sometime (except blocked and verify now)
  useEffect(() => {
    if (!apiError) return;

    const timer = setTimeout(() => {
      setApiError("");
    }, 4000); 

    return () => clearTimeout(timer);
  }, [apiError]);


  // Login page must ALSO detect Google errors
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const message = params.get("message");

    // GOOGLE BLOCKED USER
    if (code === "USER_BLOCKED") {
      setBlockedMessage(message || "Your account has been temporarily blocked.");
      setShowBlockedModal(true);
      setTitle("Account Blocked")
    }

    if (code === "WRONG_PROVIDER") {
      setBlockedMessage(message || "Please login using email and password.");
      setShowBlockedModal(true);
      setTitle("Use a different login method")
    }
    // Clean URL
      window.history.replaceState({}, "", "/login");
  }, []);

  const { values, errors, handleChange, validateForm } = useForm<LoginFormValues>({
    email: { value: "", validators: [required("Email"), validEmail] },
    password: { value: "", validators: [required("Password"), minLength("Password", 8)] },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await loginApi(values);
      dispatch(setAuth({
        accessToken: response.data.accessToken,
        user: response.data.user,
        isAuthenticated: true,   
      }));

      showSuccess("logged in successfully 🎉");

      // Small delay so user sees toast
      setTimeout(() => {
        navigate(`/${response.data.user.role}/home`);
      }, 800);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        const code = err.response?.data?.code;
        // BLOCKED USER → MODAL
        if (code === "USER_BLOCKED") {
          setBlockedMessage(
            message || "Your account has been temporarily blocked."
          );
          setShowBlockedModal(true);
          return;
        }

        // NOT VERIFIED → OTP MODAL
        if (code === "USER_NOT_VERIFIED") {
          setShowNonverifiedModal(true);
          return;
        }

        // NORMAL ERROR
        setApiError(message || "Invalid email or password");
      } else {
        setApiError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtpAndVerify = async () => {
    try {
      setLoading(true);
      const response = await resendOtpApi({ email: values.email });

      const expiresAt = response.data.expiresAt;

      // Store needed data for Verify OTP page
      localStorage.setItem("otp_email", values.email);
      localStorage.setItem("otp_expires_at", expiresAt.toString());

      setShowNonverifiedModal(false);
      navigate("/verify-otp");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || "Failed to send OTP");
      } else {
        setApiError("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#011321] flex items-center justify-center">
      <div className="bg-[#051e30] w-3/12 p-8 rounded-lg">
        <form onSubmit={handleSubmit} >
          <p className="inline-block border border-gray-500 rounded-md px-3 py-1 text-gray-100 font-mono font-bold text-2xl mb-4">
            C<span className="text-orange-600">o</span>nnect
          </p>
          <p className="text-white text-xl font-semibold block mb-1">Sign In</p>
          <p className="text-gray-400 text-sm block mb-6">Sign in to your account.</p>

          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
  
          {/* Email */}
          <label className="block text-white text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white outline-none focus:border-blue-500"
          />
          {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

          {/* Password */}
          <label className="block text-white text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

          {/* Forgot password */}
          <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-500 hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`block w-full text-white font-semibold py-2 rounded-md mb-4 cursor-pointer ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() =>
            window.location.href = config.google.authUrl
          }
          className="w-full flex items-center justify-center gap-3 border border-gray-500 rounded-md py-2 text-white hover:bg-white hover:text-black transition cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-500 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>

      <Modal
        isOpen={showBlockedModal}
        title={title}
        description={blockedMessage}
        confirmText="OK"
        cancelText=""
        onConfirm={() => setShowBlockedModal(false)}
        onCancel={() => setShowBlockedModal(false)}
      />

      {/* modal for not verified user case */}
      <Modal
        isOpen={showNonverifiedModal}
        title="Account Not Verified"
        description="Your account is not verified yet. Please verify your email to continue."
        confirmText={loading ? "Sending OTP..." : "Send OTP & Verify Now"}
        cancelText="Cancel"
        onConfirm={handleSendOtpAndVerify}
        onCancel={() => setShowNonverifiedModal(false)}
      />
    </div>
  );
};

export default Login;
