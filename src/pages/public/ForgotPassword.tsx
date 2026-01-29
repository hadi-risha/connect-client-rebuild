import axios from "axios";

import { useForm } from "../../hooks/useForm";
import { required, validEmail } from "../../utils/validators";
import { useEffect, useState } from "react";
import { forgotPasswordApi } from "../../api/userAuth.api";
import Modal from "../../components/ui/Modal"; 
import { Link } from "react-router-dom";

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (!apiError) return;

    const timer = setTimeout(() => {
      setApiError("");
    }, 4000); // 

    return () => clearTimeout(timer);
  }, [apiError]);


  const { values, errors, handleChange, validateForm } = useForm<ForgotPasswordFormValues>({
    email: { value: "", validators: [required("Email"), validEmail] },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;
    setLoading(true);
    try {
      await forgotPasswordApi(values);
      setModalMessage("we’ve sent a password recovery link. Please check your inbox.");
      setShowModal(true);
      return;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setApiError(message || "Invalid email");
      } else {
        setApiError("Something went wrong");
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
          <p className="text-white text-xl font-semibold block mb-1">Recover Password</p>
          <p className="text-gray-400 text-sm block mb-6">Please provide the email address that you used when you signed up for your account.</p>

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

          <button
            type="submit"
            disabled={loading}
            className={`block w-full text-white font-semibold py-2 rounded-md mb-4 cursor-pointer ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending..." : "Send Recovery Link"}
          </button>
          <Link to="/login" className="block text-center text-sm text-blue-400 hover:text-white">
          Go to login
        </Link>
        </form>
      </div>

      <Modal
        isOpen={showModal}
        title="Password Recovery"
        description={modalMessage}
        confirmText="OK"
        cancelText=""
        onConfirm={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default ForgotPassword;
