import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { required, minLength, matchField } from "../../utils/validators";
import { validateResetTokenApi, resetPasswordApi } from "../../api/userAuth.api";
import Modal from "../../components/ui/Modal";
import { showSuccess, showError } from "../../utils/toast";

interface ResetFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const { values, errors, handleChange, validateForm } =
    useForm<ResetFormValues>({
      password: {
        value: "",
        validators: [required("Password"), minLength("Password", 8)],
      },
      confirmPassword: {
        value: "",
        validators: [
          required("Confirm Password"),
          matchField("Confirm Password", "password"),
        ],
      },
    });

  // Extract & validate token on page load
  useEffect(() => {
    const urlToken = searchParams.get("token");
    const urlEmail = searchParams.get("email");
    if (!urlToken || !urlEmail) {
      setShowInvalidModal(true);
      setIsCheckingToken(false);
      return;
    }

    setEmail(urlEmail);
    setToken(urlToken);

    validateToken(urlEmail, urlToken);
  }, [searchParams]);

  const validateToken = async (email: string, token: string) => {
    try {
      await validateResetTokenApi({ email, token });
      setIsTokenValid(true);
    } catch(err) {
      console.log("token error", err)
      setShowInvalidModal(true);
    } finally {
      setIsCheckingToken(false);
    }
  };

  // Submit new password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;
    setLoading(true);
    try {
      await resetPasswordApi({
        email,
        token, 
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      showSuccess("Password reset successful. Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Something went wrong";
        setApiError(msg);
        showError(msg);
      } else {
        setApiError("Something went wrong");
        showError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Wait until token validation finishes
  if (isCheckingToken) return null;

  return (
    <div className="h-screen w-screen bg-[#011321] flex items-center justify-center">
      {isTokenValid && (
        <form onSubmit={handleSubmit} className="bg-[#051e30] w-3/12 p-8 rounded-lg">
          <p className="inline-block border border-gray-500 rounded-md px-3 py-1 text-gray-100 font-mono font-bold text-2xl mb-4">
            C<span className="text-orange-600">o</span>nnect
          </p>

          <p className="text-white text-xl font-semibold mb-4">
            Reset Password
          </p>

          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

          <label className="block text-white text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent placeholder-white/70 placeholder:text-sm border border-gray-500 text-white outline-none focus:border-blue-500"
          />
          {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

          <label className="block text-white text-sm mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent placeholder-white/70 placeholder:text-sm border border-gray-500 text-white outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mb-2">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`block w-full text-white font-semibold py-2 rounded-md mb-4 ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <Link to="/login" className="block text-center text-sm text-blue-400 hover:text-white">
            Go to login
          </Link>
        </form>
      )}

      {/* Invalid token modal */}
      <Modal
        isOpen={showInvalidModal}
        title="Invalid Reset Link"
        description="This password reset link is invalid or has expired."
        confirmText="Go to Forgot Password"
        onConfirm={() => navigate("/forgot-password")}
      />
    </div>
  );
};

export default ResetPassword;
