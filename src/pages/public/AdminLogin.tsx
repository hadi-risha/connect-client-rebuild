import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import { required, minLength, validEmail } from "../../utils/validators";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setAuth } from "../../features/auth/authSlice";
import { showSuccess } from "../../utils/toast";
import { adminLoginApi } from "../../api/admin.api";

interface LoginFormValues {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (!apiError) return;

    const timer = setTimeout(() => {
      setApiError("");
    }, 4000); 

    return () => clearTimeout(timer);
  }, [apiError]);

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
      const response = await adminLoginApi(values);
      dispatch(setAuth({
        accessToken: response.data.accessToken,
        user: response.data.user,
        isAuthenticated: true,   
      }));

      showSuccess("logged in successfully 🎉");

      // Small delay so user sees toast
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 800);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setApiError(message || "Invalid email or password");
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
          <p className="text-white text-xl font-semibold block mb-1">Admin Login</p>
          <p className="text-gray-400 text-sm block mb-6">Log in to access your dashboard.</p>

          {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

  
          {/* Email */}
          <label className="block text-white text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white outline-none focus:border-blue-500 placeholder:text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}

          {/* Password */}
          <label className="block text-white text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Password"
            className="block w-full mb-1 px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white outline-none focus:border-blue-500 placeholder:text-sm"
          />
          {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}

          {/* Forgot password */}
          {/* <div className="flex justify-end mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-500 hover:underline transition"
            >
              Forgot password?
            </Link>
          </div> */}

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
      </div>
    </div>
  );
};

export default AdminLogin;
