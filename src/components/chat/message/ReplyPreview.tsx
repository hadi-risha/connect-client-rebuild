import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { clearReplyTo } from "../../../features/chat/chatSlice";

export const ReplyPreview = () => {
  const replyTo = useAppSelector(state => state.chat.replyToMessage);
  const dispatch = useAppDispatch();

  if (!replyTo) return null;

  return (
    <div className="flex items-center justify-between bg-gray-100 border-l-4 border-blue-500 px-3 py-2 rounded">
      <div className="text-sm truncate">
        <div className="font-semibold">
          Replying to {replyTo.sender.name}
        </div>
        <div className="opacity-70 truncate">
          {replyTo.content
            ? replyTo.content
            : replyTo.image
            ? "📷 Image"
            : "🎤 Audio"}
        </div>
      </div>

      <button onClick={() => dispatch(clearReplyTo())}>✕</button>
    </div>
  );
};
