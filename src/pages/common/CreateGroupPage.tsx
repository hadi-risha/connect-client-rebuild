import Modal from "../../components/ui/Modal";
import { useForm } from "../../hooks/useForm";
import { required, minLength } from "../../utils/validators";
import { showError, showSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { createGroupChatApi } from "../../api/chat.api";
import { RequiredStar } from "../../components/ui/RequiredStar";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { selectChat, setChats } from "../../features/chat/chatSlice";
import { useImageInput } from "../../hooks/useImageInput";   
import type { ChatRoom } from "../../features/chat/chat.types";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chats = useSelector((state: RootState) => state.chat.chats);

  // form
  const form = useForm({
    name: {
      value: "",
      validators: [required("Group name"), minLength("Group name", 3)],
    },
    description: {
      value: "",
      validators: [minLength("Description", 5)],
    },
  });

  const image = useImageInput({
    initialUrl: undefined,
    required: false, 
  });

  const handleCreate = async () => {
    const isFormValid = form.validateForm();
    const isImageValid = image.validate();  

    if (!isFormValid || !isImageValid) return;

    try {
      const payload = {
        name: form.values.name,
        description: form.values.description,
        imageFile: image.file ?? undefined,  
      };

      const { data } = await createGroupChatApi(payload);
      const newGroup: ChatRoom = data.chat;

      const exists = chats.find((c) => c._id === newGroup._id);
      if (!exists) dispatch(setChats([newGroup, ...chats]));

      dispatch(selectChat(newGroup));

      showSuccess("Group created successfully 🎉");
      navigate(`/user/chat`, { replace: true });
    } catch (e) {
      showError("Failed to create group");
    }
  };

  return (
    <Modal
      isOpen
      title="Create Group"
      description="Create a public group chat"
      confirmText="Create"
      cancelText="Cancel"
      onConfirm={handleCreate}
      onCancel={() => navigate(-1)}
    >
      <div className="space-y-3">

        {/* GROUP NAME */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">
            Group name <RequiredStar />
          </label>
          <input
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            placeholder="Enter group name"
            className="w-full px-3 py-2 border rounded text-white bg-transparent"
          />
          {form.errors.name && (
            <p className="text-red-400 text-sm">{form.errors.name}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">
            Description (Optional)
          </label>
          <textarea
            name="description"
            value={form.values.description}
            onChange={form.handleChange}
            placeholder="Enter group description"
            className="w-full px-3 py-2 border rounded text-white bg-transparent"
          />
          {form.errors.description && (
            <p className="text-red-400 text-sm">{form.errors.description}</p>
          )}
        </div>

        {/* GROUP IMAGE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-white">Group Image</label>

          {!image.preview ? (
            <div className="space-y-1">
              <label
                htmlFor="groupImage"
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-500 rounded-md cursor-pointer hover:border-white transition text-gray-300"
              >
                🖼️ <span className="font-medium">Choose group image</span>
              </label>

              <input
                id="groupImage"
                type="file"
                accept="image/*"  // browser-level restriction
                className="hidden"
                onChange={(e) =>
                  e.target.files && image.selectImage(e.target.files[0])
                }
              />

              <p className="text-xs text-gray-400">Only image files allowed</p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <img
                src={image.preview}
                className="w-16 h-16 rounded-full object-cover"
              />
              <button
                onClick={image.removeImage}
                className="text-red-400 text-sm"
              >
                Remove
              </button>
            </div>
          )}

          {image.error && (
            <p className="text-red-400 text-sm">{image.error}</p>
          )}
        </div>

      </div>
    </Modal>
  );
};

export default CreateGroupPage;
