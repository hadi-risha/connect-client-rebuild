import { useAppDispatch } from "../../../hooks/redux";
import { setReplyTo } from "../../../features/chat/chatSlice";

export const ReplyButton = ({ message }: { message: any }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => dispatch(setReplyTo(message))}
      className="text-sm bg-white rounded-full shadow px-1"
      title="Reply"
    >
      ↩️
    </button>
  );
};
