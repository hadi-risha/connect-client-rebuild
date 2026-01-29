import { Role } from "../../constants/roles";
import { useForm } from "../../hooks/useForm";
import { required, minLength } from "../../utils/validators";
import { useImageInput } from "../../hooks/useImageInput";
import type { User } from "../../features/user/user.types";
import { useNavigate } from "react-router-dom";

interface Props {
  user: User;
  onSubmit: (payload: any) => void;
  loading?: boolean;
}

const UserProfileForm = ({ user, onSubmit, loading }: Props) => {
  const isInstructor = user.role === Role.INSTRUCTOR;
  const navigate = useNavigate();

  const form = useForm({
    name: { value: user.name || "", validators: [required("Name")] },
    bio: {
      value: user.instructorProfile?.bio || "",
      validators: isInstructor ? [required("Bio"), minLength("Bio", 10)] : [],
    },
    expertise: {
      value: user.instructorProfile?.expertise || "",
      validators: isInstructor ? [required("Expertise")] : [],
    },
  });

  const image = useImageInput({
    initialUrl: user.profilePicture?.url,
    required: false,
  });

  const handleSubmit = () => {
    const isFormValid = form.validateForm();
    const isImageValid = image.validate();
    if (!isFormValid || !isImageValid) return;

    onSubmit({
      name: form.values.name,
      instructorProfile: isInstructor
        ? { bio: form.values.bio, expertise: form.values.expertise }
        : undefined,
      imageFile: image.file ?? undefined,
      removePhoto: image.removed,
    });
  };

  const profilePath =
    user.role === Role.INSTRUCTOR ? "/instructor/profile" : "/student/profile";

  return (
    <div className="space-y-6">
      {/* name */}
      <FormCard label="Name" error={form.errors.name}>
        <input
          name="name"
          value={form.values.name}
          onChange={form.handleChange}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-700 outline-none"
        />
      </FormCard>

      {/* instructor fields */}
      {isInstructor && (
        <>
          <FormCard label="Bio" error={form.errors.bio}>
            <input
              name="bio"
              value={form.values.bio}
              onChange={form.handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-700 outline-none"
            />
          </FormCard>

          <FormCard label="Expertise" error={form.errors.expertise}>
            <input
              name="expertise"
              value={form.values.expertise}
              onChange={form.handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:ring-2 focus:ring-slate-700 outline-none"
            />
          </FormCard>
        </>
      )}

      {/* image */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Profile Picture
        </p>

        {!image.preview ? (
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-slate-600 transition text-gray-400 bg-gray-50">
            <span className="text-xl">📷</span>
            <span className="text-sm mt-1">Choose profile picture</span>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                e.target.files && image.selectImage(e.target.files[0])
              }
            />
          </label>
        ) : (
          <div className="flex items-center gap-5">
            <img
              src={image.preview}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-white shadow"
            />
            <button
              type="button"
              onClick={image.removeImage}
              className="text-sm text-red-500 hover:underline"
            >
              Remove photo
            </button>
          </div>
        )}

        {image.error && <p className="text-red-500 text-sm">{image.error}</p>}
      </div>

      {/* actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={() => navigate(profilePath)}
          className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 rounded-xl bg-slate-800 text-white font-semibold shadow-md hover:bg-slate-900 active:scale-[0.98] transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

const FormCard = ({ label, error, children }: any) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-2">
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label}
    </p>
    {children}
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);



export default UserProfileForm;
