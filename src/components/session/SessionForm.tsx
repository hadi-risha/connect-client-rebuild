import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useForm } from "../../hooks/useForm";
import { useImageInput } from "../../hooks/useImageInput";
import { showError, showSuccess } from "../../utils/toast";
import clsx from "clsx";
import type { Session } from "../../features/session/session.types";
import { minLength, minValue, required } from "../../utils/validators";
import { SessionCategory } from "../../constants/sessionCategory";
import { RequiredStar } from "../ui/RequiredStar";
import type { AxiosError } from "axios";

interface Props {
  mode: "create" | "edit";
  initialData?: Session | null;
  onSubmit: (payload: {
    session: Omit<Session, "coverPhoto">;
    imageFile?: File | null;
    imageRemoved?: boolean;
  }) => Promise<void>;
}

export default function SessionForm({ mode, initialData, onSubmit }: Props) {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [timeSlotError, setTimeSlotError] = useState<string | null>(null);

  // form
  const { values, errors, handleChange, validateForm } = useForm({
    title: {
      value: initialData?.title || "",
      validators: [required("Title"), minLength("Title", 3)],
    },
    introduction: {
      value: initialData?.introduction || "",
      validators: [required("Introduction")],
    },
    description: {
      value: initialData?.description || "",
      validators: [required("Description")],
    },
    duration: {
      value: initialData?.duration?.toString() || "",
      validators: [required("Duration")],
    },
    fees: {
      value: initialData?.fees?.toString() || "",
      validators: [
        required("Fees"),
        minValue("Fees", 38), // must be more than 38
      ],
    },
    category: {
      value: initialData?.category || "",
      validators: [required("Category")],
    },
  });

  // bullets
  const [bulletPoints, setBulletPoints] = useState<string[]>(
    initialData?.bulletPoints || [""]
  );

  const addBullet = () => {
    if (bulletPoints[bulletPoints.length - 1].trim()) {
      setBulletPoints([...bulletPoints, ""]);
    }
  };

  const removeBullet = (i: number) =>
    setBulletPoints(bulletPoints.filter((_, idx) => idx !== i));

  // time slots
  const [timeSlots, setTimeSlots] = useState<string[]>(
    initialData?.timeSlots || []
  );

  const addTimeSlot = (time: string) => {
    if (!time) return;

    const iso = new Date(`1970-01-01T${time}:00`).toISOString();

    if (timeSlots.includes(iso)) return;

    setTimeSlots([...timeSlots, iso]);
    setTimeSlotError(null); 
  };


  const removeTimeSlot = (i: number) =>
    setTimeSlots(timeSlots.filter((_, idx) => idx !== i));

  // image
  const image = useImageInput({
    initialUrl: initialData?.coverPhoto?.url || null,
    required: true,
  });

  // submit
  const handleSubmit = async () => {
    setApiError(null);

    const isFormValid = validateForm();
    const isImageValid = image.validate();

    if (!isFormValid || !isImageValid) {
      showError("Please fill the required fields");
      return;
    }

    if (timeSlots.length === 0) {
      setTimeSlotError("At least one time slot is required");
      showError("Please fill the required fields");
      return;
    }
    
    try {
      setSubmitting(true);
      await onSubmit({
        session: {
          title: values.title,
          introduction: values.introduction,
          description: values.description,
          bulletPoints: bulletPoints.filter(Boolean),
          duration: Number(values.duration),
          fees: Number(values.fees),
          category: values.category,
          timeSlots,
        },
        imageFile: image.file,
        imageRemoved: image.removed,
      });


      showSuccess(
        mode === "create" ? "Session created successfully" : "Session updated"
      );

      navigate("/instructor/sessions");
    } catch (err: unknown) {
      let message = "Something went wrong";

      // standard JS Error
      if (err instanceof Error) {
        message = err.message;
      }

      // axios error (API response)
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        message = axiosErr.response?.data?.message || message;
      }
      setApiError(message);
      showError("Failed to save session");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-center">
          {mode === "create" ? "Create Session" : "Edit Session"}
        </h1>

        {apiError && (
          <div className="mb-6 rounded bg-red-100 p-3 text-red-600">
            {apiError}
          </div>
        )}

        <label className="font-medium">
          Title <RequiredStar />
        </label>
        <Input  name="title" {...{ values, errors, handleChange }} />

        <label className="font-medium">
          Introduction <RequiredStar />
        </label>
        <Textarea
          name="introduction"
          {...{ values, errors, handleChange }}
        />

        <label className="font-medium">
          Description <RequiredStar />
        </label>
        <Textarea
          name="description"
          {...{ values, errors, handleChange }}
        />

        {/* Duration & Fees */}
        <div className="grid grid-cols-2 gap-6">
          {/* Duration */}
          <div className="mb-4">
            <label className="font-medium">
              Duration (minutes) <RequiredStar />
            </label>
            <input
              name="duration"
              value={values.duration}
              onChange={handleChange}
              type="number"
              min="1"
              className="input"
            />
            {errors.duration && <p className="error">{errors.duration}</p>}
          </div>

          {/* Fees */}
          <div className="mb-4">
            <label className="font-medium">
              Fees <RequiredStar />
            </label>

            <div className="relative">
              <input
                name="fees"
                value={values.fees}
                onChange={handleChange}
                type="number"
                min="39"
                className="input pl-10" 
                placeholder="Enter fees"
              />
            </div>
            {errors.fees && <p className="error">{errors.fees}</p>}
          </div>
        </div>

        {/* Category */}
        <label className="font-medium">
            Category <RequiredStar />
          </label>
        <Select
          name="category"
          {...{ values, errors, handleChange }}
        >
          <option value="">Select category</option>
          {Object.values(SessionCategory).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        {/* Bullet Points */}
        <Section>
          <label className="font-medium">Bullet Points</label>
          {bulletPoints.map((bp, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                className="input"
                value={bp}
                onChange={(e) => {
                  const arr = [...bulletPoints];
                  arr[i] = e.target.value;
                  setBulletPoints(arr);
                }}
              />
              <button onClick={() => removeBullet(i)}>🗑</button>
              {i === bulletPoints.length - 1 && (
                <button onClick={addBullet}>➕</button>
              )}
            </div>
          ))}
        </Section>

        {/* Time Slots */}
        <Section>
          <label className="font-medium">
            Time Slots (24h) <RequiredStar />
          </label>
          <input
            type="time"
            className="input w-40"
            onChange={(e) => addTimeSlot(e.target.value)}
          />

          <ul className="mt-3 space-y-2">
            {timeSlots.map((t, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded bg-gray-100 px-3 py-1"
              >
                <span>
                  {new Date(t).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
                <button onClick={() => removeTimeSlot(i)}>❌</button>
              </li>
            ))}
          </ul>
          {timeSlotError && (
            <p className="error mt-1">{timeSlotError}</p>
          )}
        </Section>


        {/* Image */}
        <Section>
          <label className="font-medium">
            Cover Photo <RequiredStar />
          </label>
          {image.preview ? (
            <div className="flex items-center gap-4">
              <img
                src={image.preview}
                className="h-20 w-20 rounded object-cover border"
              />
              <button
                type="button"
                onClick={image.removeImage}
                className="rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                title="Remove image"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <label className="flex h-40 cursor-pointer items-center justify-center rounded border-2 border-dashed">
              <span>Select image</span>
              <input
                hidden
                type="file"
                onChange={(e) =>
                  e.target.files && image.selectImage(e.target.files[0])
                }
              />
            </label>
          )}
          {image.error && (
            <p className="mt-1 text-sm text-red-500">{image.error}</p>
          )}
        </Section>

        {/* Submit */}
        <button
          disabled={submitting}
          onClick={handleSubmit}
          className={clsx(
            "mt-8 w-full rounded bg-blue-600 py-3 text-white cursor-pointer",
            submitting && "opacity-50"
          )}
        >
          {submitting ? "Submitting..." : "Save Session"}
        </button>
      </div>
    </div>
  );
}

// SMALL REUSABLE UI
const Input = ({ label, name, values, errors, handleChange }: any) => (
  <div className="mb-4">
    <label className="font-medium">{label}</label>
    <input
      name={name}
      value={values[name]}
      onChange={handleChange}
      className="input"
    />
    {errors[name] && <p className="error">{errors[name]}</p>}
  </div>
);

const Textarea = ({ label, name, values, errors, handleChange }: any) => (
  <div className="mb-4">
    <label className="font-medium">{label}</label>
    <textarea
      name={name}
      value={values[name]}
      onChange={handleChange}
      className="input h-24"
    />
    {errors[name] && <p className="error">{errors[name]}</p>}
  </div>
);

const Select = ({ label, name, values, errors, handleChange, children }: any) => (
  <div className="mb-4">
    <label className="font-medium">{label}</label>
    <select
      name={name}
      value={values[name]}
      onChange={handleChange}
      className="input"
    >
      {children}
    </select>
    {errors[name] && <p className="error">{errors[name]}</p>}
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="mb-6">
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    {children}
  </div>
);
