import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { minLength, required } from "../../utils/validators";
import { RequiredStar } from "../ui/RequiredStar"; 
import axios from "axios";

interface Props {
  initialData?: {
    title: string;
    content: string;
  };
  onSubmit: (data: { title: string; content: string }) => Promise<void>;
  submitLabel: string;
  setApiError?: (msg: string | null) => void;
}

const NotificationForm = ({
  initialData,
  onSubmit,
  submitLabel,
  setApiError,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const { values, errors, handleChange, validateForm, resetForm } = useForm({
    title: {
      value: initialData?.title || "",
      validators: [required("Title"), minLength("Title", 3)],
    },
    content: {
      value: initialData?.content || "",
      validators: [required("Content"), minLength("Content", 10)],
    },
  });

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setApiError?.(null);
      setLoading(true);

      await onSubmit(values);
      resetForm();
    } catch (err: unknown) {
      let message = "Something went wrong";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      setApiError?.(message);
      throw err; // allow toast from page
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm max-w-2xl mx-auto flex flex-col items-center space-y-5">
      {/* Title */}
      <div className="w-9/12">
        <label className="block font-medium mb-1">
          Title <RequiredStar />
        </label>
        <input
          name="title"
          value={values.title}
          onChange={handleChange}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title}</p>
        )}
      </div>

      {/* Content */}
      <div className="w-9/12">
        <label className="block font-medium mb-1">
          Content <RequiredStar />
        </label>
        <textarea
          name="content"
          rows={4}
          value={values.content}
          onChange={handleChange}
          className={`w-full border rounded-md px-3 py-2 ${
            errors.content ? "border-red-500" : ""
          }`}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-1/2 md:w-1/3 px-4 py-2 rounded-md text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Please wait..." : submitLabel}
      </button>
    </div>
  );
};

export default NotificationForm;
