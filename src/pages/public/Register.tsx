import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { required, minLength, onlyLetters, matchField, validEmail } from "../../utils/validators";
import { useState } from "react";
import { registerApi } from "../../api/userAuth.api";
import Modal from "../../components/ui/Modal";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const { values, errors, handleChange, validateForm } = useForm<RegisterFormValues>({
    name: { value: "", validators: [required("Name"), onlyLetters("Name")] },
    email: { value: "", validators: [required("Email"), validEmail] },
    password: { value: "", validators: [required("Password"), minLength("Password", 8)] },
    // confirmPassword: { value: "", validators: [required("Confirm Password"), matchField("Confirm Password", "password")] },
    confirmPassword: {value: "", validators: [required("Confirm Password"), matchField<RegisterFormValues, "password">("Confirm Password", "password")]},
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await registerApi(values);

      // persist
      localStorage.setItem("otp_email", values.email);
      localStorage.setItem("otp_expires_at", res.data.expiresAt.toString());

      // show modal instead of navigating immediately
      setShowOtpModal(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || "Something went wrong");
      } else {
        setApiError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#011321] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-[#051e30] w-3/12 p-8 rounded-lg">
        <p className="inline-block border border-gray-500 rounded-md px-3 py-1 text-gray-100 font-mono font-bold text-2xl mb-4">
          C<span className="text-orange-600">o</span>nnect
        </p>
        <p className="text-white text-xl font-semibold block mb-1">Sign Up</p>
        <p className="text-gray-400 text-sm block mb-6">Welcome, please register your account.</p>

        {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

        {/* Name */}
        <label className="block text-white text-sm mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white outline-none focus:border-blue-500"
        />
        {errors.name && <p className="text-red-500 text-xs mb-2">{errors.name}</p>}

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

        {/* Confirm Password */}
        <label className="block text-white text-sm mb-1">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white outline-none focus:border-blue-500"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mb-2">{errors.confirmPassword}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`block w-full text-white font-semibold py-2 rounded-md mb-4 ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <Link to="/login" className="block text-center text-sm text-gray-400 hover:text-white">
          Already registered?
        </Link>
      </form>
      <Modal
        isOpen={showOtpModal}
        title="OTP Sent"
        description={`An OTP has been sent to ${values.email}. Please verify to continue.`}
        confirmText="Verify OTP"
        cancelText="Cancel"
        onConfirm={() => {
          setShowOtpModal(false);
          navigate(`/verify-otp`);
        }}
        onCancel={() => {
          setShowOtpModal(false);
        }}
      />

    </div>
  );
};

export default Register;
