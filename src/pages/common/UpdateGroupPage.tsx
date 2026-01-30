import Modal from "../../components/ui/Modal";
import { useForm } from "../../hooks/useForm";
import { required, minLength } from "../../utils/validators";
import { showError, showSuccess } from "../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { getChatApi, updateGroupChatApi } from "../../api/chat.api";
import { useEffect, useState } from "react";
import { RequiredStar } from "../../components/ui/RequiredStar";
import { useDispatch } from "react-redux";
import { updateChat } from "../../features/chat/chatSlice";
import type { ChatRoom } from "../../features/chat/chat.types";
import { getImageKitAuthApi } from "../../api/imagekit.api";
import { uploadToImageKit } from "../../api/imagekit.upload";
import { useImageInput } from "../../hooks/useImageInput";

interface UpdateGroupPayload {
  name: string;
  description: string;
  image?: { key: string; url: string };
  removeOldImage?: boolean;
}

const UpdateGroupPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [group, setGroup] = useState<ChatRoom | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    name: { value: "", validators: [required("Group name"), minLength("Group name", 3)] },
    description: { value: "", validators: [minLength("Description", 5)] },
  });

  // 💡 Image hook handles everything
  const image = useImageInput({
    initialUrl: group?.image?.url || null,
    maxSizeMB: 5,
  });

  // Fetch group
  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data } = await getChatApi(id);
        setGroup(data.group);

        form.setValues({
          ...form.values,
          name: data.group.name,
          description: data.group.description || "",
        });
      } catch {
        showError("Failed to fetch group data");
        navigate(-1);
      }
    })();
  }, [id]);

  // Update preview if group loads later
  useEffect(() => {
    if (group?.image?.url) {
      // only set if user hasn't chosen new file
      if (!image.file && !image.removed) {
        // small trick: directly update preview
        image.selectImage(
          new File([], "") // dummy to avoid TS? NO — instead we skip. So we do nothing.
        );
      }
    }
  }, [group]); // optional — safe to skip if preview already handled

  const handleUpdate = async () => {
    if (!group) return;
    if (!form.validateForm()) return;
    if (!image.validate()) return;

    try {
      setLoading(true);

      const payload: UpdateGroupPayload = {
        name: form.values.name,
        description: form.values.description,
      };

      // 🔥 New image selected
      if (image.file) {
        const auth = await getImageKitAuthApi();
        const uploaded = await uploadToImageKit(image.file, auth.data);

        payload.image = {
          key: uploaded.fileId,
          url: uploaded.url,
        };
        payload.removeOldImage = true;
      }

      // 🔥 User removed old image without new one
      if (image.removed && !image.file) {
        payload.removeOldImage = true;
      }

      const { data } = await updateGroupChatApi(group._id, payload);

      dispatch(updateChat(data.chat));
      showSuccess("Group updated successfully 🎉");
      navigate(`/user/chat/${group._id}`, { replace: true });
    } catch {
      showError("Failed to update group");
    } finally {
      setLoading(false);
    }
  };

  if (!group) return null;

  return (
    <Modal
      isOpen
      title="Update Group"
      description={`Update "${group.name}"`}
      confirmText={loading ? "Updating..." : "Update"}
      cancelText="Cancel"
      onConfirm={handleUpdate}
      onCancel={() => navigate(-1)}
    >
      <div className="space-y-3">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">
            Group name <RequiredStar />
          </label>
          <input
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            className="w-full px-3 py-2 border rounded text-white bg-transparent"
          />
          {form.errors.name && <p className="text-red-400 text-sm">{form.errors.name}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Description</label>
          <textarea
            name="description"
            value={form.values.description}
            onChange={form.handleChange}
            className="w-full px-3 py-2 border rounded text-white bg-transparent"
          />
          {form.errors.description && <p className="text-red-400 text-sm">{form.errors.description}</p>}
        </div>

        {/* Image */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Group Image</label>

          {!image.preview ? (
            <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-full cursor-pointer hover:border-slate-400">
              <span className="text-xs text-gray-400">Upload</span>
              <input
                type="file"
                hidden
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) =>
                  e.target.files && image.selectImage(e.target.files[0])
                }
              />
            </label>
          ) : (
            <div className="relative w-24 h-24">
              <img src={image.preview} className="w-full h-full object-cover rounded-full" />
              <button
                type="button"
                onClick={image.removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
              >
                ×
              </button>
            </div>
          )}

          {image.error && <p className="text-red-400 text-sm">{image.error}</p>}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateGroupPage;
