import { useState } from "react";
import { addGroupMemberApi } from "../../../api/chat.api";
import Modal from "../../ui/Modal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectChat, setChats } from "../../../features/chat/chatSlice";
import type { RootState } from "../../../app/store";
import { showError, showSuccess } from "../../../utils/toast";
import { User } from "lucide-react";

interface GroupResultItemProps {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}  

export const GroupResultItem = ({
  id,
  name,
  description,
  imageUrl,
}: GroupResultItemProps) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const handleConfirm = async () => {
    try {
      const { data } = await addGroupMemberApi(id);
      const chat = data.chat;

      // add to chat list if not exists
      const exists = chats.find(c => c._id === chat._id);
      if (!exists) {
        dispatch(setChats([chat, ...chats]));
      }

      dispatch(selectChat(chat));
      navigate("/user/chat");

      showSuccess("Joined group");
      setOpen(false);
    } catch (error) {
      console.log("Failed to join group", error);
      showError("Unable to join the group. Please try again.")
    }
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b"
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
        )}

        <div>
          <p className="font-medium">{name}</p>
          {description && (
            <p className="text-sm text-gray-500 truncate max-w-[220px]">
              {description}
            </p>
          )}
        </div>
      </div>

      <Modal
        isOpen={open}
        title="Join Group"
        description={`Do you want to join "${name}"?`}
        confirmText="Join"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />

    </>
  );
};

