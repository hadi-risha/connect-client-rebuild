import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateProfileApi } from "../../api/user.api";
import { getImageKitAuthApi } from "../../api/imagekit.api";
import { uploadToImageKit } from "../../api/imagekit.upload";
import { setUser } from "../../features/user/userSlice";
import { showSuccess, showError } from "../../utils/toast";
import UserProfileForm from "../../components/common/UserProfileForm";

const InstructorProfileEdit = () => {
  const { user } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleUpdate = async (data: any) => {
    try {
      setLoading(true);
      let payload = { ...data };

      if (data.imageFile) {
        const auth = await getImageKitAuthApi();
        const uploaded = await uploadToImageKit(data.imageFile, auth.data);

        payload.profilePicture = {
          key: uploaded.fileId,
          url: uploaded.url,
        };
      }
      delete payload.imageFile;

      const res = await updateProfileApi(payload);
      dispatch(setUser({ user: res.data.user }));
      showSuccess("Profile updated successfully");
      navigate("/instructor/profile");
    } catch {
      showError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
          
          <div className="h-24 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10" />
            <h1 className="relative z-10 text-white text-xl font-semibold tracking-wide">
              Edit Profile
            </h1>
          </div>

          <div className="py-10 px-8 pb-10">
            <UserProfileForm user={user} onSubmit={handleUpdate} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfileEdit;
