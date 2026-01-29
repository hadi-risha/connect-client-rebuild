// in new chat tab - this only shows one-to-one non chated results
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrCreateChatApi } from "../../../api/chat.api";
import { selectChat, setChats } from "../../../features/chat/chatSlice";
import { showError, showSuccess } from "../../../utils/toast";
import type { RootState } from "../../../app/store";
import { User } from "lucide-react";

interface UserResultItemProps {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

export const UserResultItem = ({
  id,
  name,
  email,
  imageUrl,
}: UserResultItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chats = useSelector((state: RootState) => state.chat.chats);

  const handleClick = async () => {
    try {
      const { data } = await getOrCreateChatApi(id);
      const exists = chats.find(c => c._id === data.chat._id);
      if (!exists) {
        dispatch(setChats([data.chat, ...chats]));
      }

      dispatch(selectChat(data.chat));
      navigate("/user/chat");

      showSuccess("Chat created");
    } catch {
      showError("Failed to create chat");
    }
  };

  return (
    <div
      onClick={handleClick}
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
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};
