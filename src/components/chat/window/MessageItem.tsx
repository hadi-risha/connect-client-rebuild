import type { Message } from "../../../features/chat/chat.types";
import { useAppSelector } from "../../../hooks/redux";
import { deleteMessageSocket } from "../../../socket/chat.emitters";
import { useState } from "react";
import Modal from "../../ui/Modal";
import { showSuccess } from "../../../utils/toast";
import { ReactionBar } from "./ReactionBar";
import { ReactionPicker } from "./ReactionPicker";

type Props = {
  message: Message;
};

export const MessageItem = ({ message }: Props) => {
  const myId = useAppSelector(state => state.user.user?._id);
  const selectedChat = useAppSelector(state => state.chat.selectedChat);

  // let isMine = message.sender?._id === myId;
  // if (!isMine) isMine = (message).sender === myId;
  const isMine =
  typeof message.sender === "string"
    ? message.sender === myId
    : message.sender._id === myId;


  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDelete = () => {
    if (!selectedChat) return;
    deleteMessageSocket(selectedChat._id, message._id);
    setOpen(false);
    showSuccess("Message deleted");
  };

  return (
    <>
      <div
        className={`max-w-[70%] p-3 rounded-lg text-sm relative
          ${isMine
            ? "ml-auto bg-blue-500 text-white"
            : "mr-auto bg-gray-200 text-black"}`}
        onMouseEnter={() => setShowPicker(true)}
        onMouseLeave={() => setShowPicker(false)}
      >
        {/* Reaction Picker */}
        {!message.isDeleted && showPicker && (
          <ReactionPicker 
            messageId={message._id}
            onReact={() => setShowPicker(false)}
          />
        )}

        {message.isDeleted ? (
          <span className="italic text-xs opacity-70">
            🚫 This message was deleted
          </span>
        ) : (
          <>
            <div>{message.content}</div>

            <div
              className={`text-[10px] mt-1 text-right
                ${isMine ? "text-blue-100" : "text-gray-400"}`}
            >
              {time}
            </div>

            {/* Reactions */}
            <ReactionBar
              messageId={message._id}
              reactions={message.reactions}
            />
          </>
        )}

        {isMine && !message.isDeleted && (
          <button
            onClick={() => setOpen(true)}
            className="absolute -top-2 -right-2
              bg-red-500 text-white text-[10px] px-2 py-1 rounded shadow
              opacity-0 hover:opacity-100 transition"
          >
            Delete
          </button>
        )}
      </div>

      <Modal
        isOpen={open}
        title="Delete message?"
        description="This message will be removed for everyone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
