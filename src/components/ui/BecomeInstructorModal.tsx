import Modal from "./Modal";
import { useForm } from "../../hooks/useForm";
import { required, minLength } from "../../utils/validators";
import { useImageInput } from "../../hooks/useImageInput";
import { useAppSelector } from "../../hooks/redux";
// import { Role } from "../../constants/roles";

interface BecomeInstructorData {
  role: "instructor";
  instructorProfile: {
    bio: string;
    expertise: string;
  };
  imageFile?: File;
  removePhoto: boolean;
}

interface Props {
  isOpen: boolean;
  onConfirm: (data: BecomeInstructorData) => void;
  onCancel: () => void;
}

const BecomeInstructorModal = ({ isOpen, onConfirm, onCancel }: Props) => {
  const { user } = useAppSelector((state) => state.user);

  const form = useForm({
    bio: {
      value: user?.instructorProfile?.bio || "",
      validators: [required("Bio"), minLength("Bio", 10)],
    },
    expertise: {
      value: user?.instructorProfile?.expertise || "",
      validators: [required("Expertise")],
    },
  });

  const image = useImageInput({
    initialUrl: user?.profilePicture?.url,
    required: !user?.profilePicture?.url,   
  });


  const handleSubmit = async () => {
    const isFormValid = form.validateForm();
    const isImageValid = image.validate();

    if (!isFormValid || !isImageValid) return;

    onConfirm({
      role: "instructor",
      instructorProfile: {
        bio: form.values.bio,
        expertise: form.values.expertise,
      },
      imageFile: image.file ?? undefined,
      removePhoto: image.removed,
    });
  };


  return (
    <Modal
      isOpen={isOpen}
      title="Become an Instructor"
      description="Please provide instructor details"
      confirmText="Submit"
      cancelText="Cancel"
      onConfirm={handleSubmit}
      onCancel={onCancel}
    >
      <div className="space-y-3">
        <input
          name="bio"
          value={form.values.bio}
          onChange={form.handleChange}
          placeholder="Short bio"
          className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white"
        />
        {form.errors.bio && <p className="text-red-400 text-sm">{form.errors.bio}</p>}

        <input
          name="expertise"
          value={form.values.expertise}
          onChange={form.handleChange}
          placeholder="Expertise (e.g. MERN, AI)"
          className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-500 text-white"
        />
        {form.errors.expertise && (
          <p className="text-red-400 text-sm">{form.errors.expertise}</p>
        )}

        {/* Image */}
        {!image.preview ? (
          <div className="space-y-1">
            <label
              htmlFor="profileImage"
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-white transition text-gray-300"
            >
              📷 <span className="font-medium">Choose profile picture</span>
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                e.target.files && image.selectImage(e.target.files[0])
              }
            />

            <p className="text-xs text-gray-400">
              No file chosen
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <img src={image.preview} className="w-16 h-16 rounded-full" />
            <button
              onClick={image.removeImage}
              className="text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        )}

        {image.error && <p className="text-red-400 text-sm">{image.error}</p>}
      </div>
    </Modal>
  );
};

export default BecomeInstructorModal;
