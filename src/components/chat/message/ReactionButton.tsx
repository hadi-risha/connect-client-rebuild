import { useState } from "react";
import { EmojiPicker } from "../common/EmojiPicker";
import { reactToMessageSocket } from "../../../socket/chat.emitters";
import { useAppSelector } from "../../../hooks/redux";

export const ReactionButton = ({ messageId }: { messageId: string }) => {
  const [open, setOpen] = useState(false);
  const chatRoomId = useAppSelector(
    s => s.chat.selectedChat?._id
  );

  if (!chatRoomId) return null;

  return (
    <div className="absolute -top-4 right-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-sm bg-white rounded-full shadow px-1"
      >
        😊
      </button>

      <EmojiPicker
        open={open}
        onClose={() => setOpen(false)}
        onSelect={emoji => {
          reactToMessageSocket(chatRoomId, messageId, emoji);
          setOpen(false);
        }}
      />
    </div>
  );
};
