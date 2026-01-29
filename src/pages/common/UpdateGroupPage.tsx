import Modal from "../../components/ui/Modal";
import { useForm } from "../../hooks/useForm";
import { required, minLength } from "../../utils/validators";
import { showError, showSuccess } from "../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import { getChatApi, updateGroupChatApi } from "../../api/chat.api";
import { useEffect, useState } from "react";
import Upload from "../../upload/Upload";
import { RequiredStar } from "../../components/ui/RequiredStar";
import { useDispatch } from "react-redux";
import { updateChat } from "../../features/chat/chatSlice";
import type { ChatRoom } from "../../features/chat/chat.types";

const UpdateGroupPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [group, setGroup] = useState<ChatRoom | null>(null);
  const [image, setImage] = useState<any>(null); // new uploaded image
  const [preview, setPreview] = useState<string | null>(null);
  const [removeOldImage, setRemoveOldImage] = useState(false); // flag if old image removed

  const form = useForm({
    name: { value: "", validators: [required("Group name"), minLength("Group name", 3)] },
    description: { value: "", validators: [minLength("Description", 5)] },
  });

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const { data } = await getChatApi(id);
        setGroup(data.group);

        form.setValue("name", data.group.name);
        form.setValue("description", data.group.description || "");
        setPreview(data.group.image?.url || null);
      } catch {
        showError("Failed to fetch group data");
        navigate(-1);
      }
    })();
  }, [id]);

  // update preview when new image uploaded
  useEffect(() => {
    if (image?.dbData?.url) {
      const timer = setTimeout(() => setPreview(image.dbData.url), 0);
      return () => clearTimeout(timer);
    }
  }, [image?.dbData]);

  const handleUpdate = async () => {
    if (!group) return;
    if (!form.validateForm()) return;

    try {
      const payload: any = {
        name: form.values.name,
        description: form.values.description,
      };

      // handle image update
      if (image?.dbData) {
        payload.image = { key: image.dbData.fileId, url: image.dbData.url };
        payload.removeOldImage = true; // signal backend to delete old image
      } else if (removeOldImage) {
        payload.removeOldImage = true;
      }

      const { data } = await updateGroupChatApi(group._id, payload);

      dispatch(updateChat(data.chat)); // update redux slice
      showSuccess("Group updated successfully 🎉");
      navigate(`/user/chat/${group._id}`, { replace: true });
    } catch {
      showError("Failed to update group");
    }
  };

  if (!group) return null; 

  return (
    <Modal
      isOpen
      title="Update Group"
      description={`Update "${group.name}"`}
      confirmText="Update"
      cancelText="Cancel"
      onConfirm={handleUpdate}
      onCancel={() => navigate(-1)}
    >
      <div className="space-y-3">
        {/* Group Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">
            Group name <RequiredStar />
          </label>
          <input
            name="name"
            value={form.values.name}
            onChange={(e) => form.handleChange(e)}
            placeholder="Enter group name"
            className="w-full px-3 py-2 border rounded text-white bg-transparent"
          />
          {form.errors.name && <p className="text-red-400 text-sm">{form.errors.name}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={form.values.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              form.handleChange(e)
            }
            placeholder="Enter group description"
            className="w-full px-3 py-2 border rounded text-white bg-transparent"
          />
          {form.errors.description && (
            <p className="text-red-400 text-sm">{form.errors.description}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Group Image</label>
          {preview ? (
            <div className="relative w-20 h-20">
              <img
                src={preview}
                alt="Group preview"
                className="w-full h-full object-cover rounded-full"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setImage(null);
                  setRemoveOldImage(true);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <Upload
              setImg={(data) => {
                setImage(data);
                if (data?.aiData?.inlineData) {
                  setPreview(
                    `data:${data.aiData.inlineData.mimeType};base64,${data.aiData.inlineData.data}`
                  );
                }
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateGroupPage;
