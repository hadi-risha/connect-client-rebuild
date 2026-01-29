import { useAppSelector } from "../../../hooks/redux";

export const TypingIndicator = () => {
  const users = useAppSelector(state => state.chat.typingUsers);

  if (!users.length) return null;

  return (
    <div className="text-xs text-gray-500">
      Someone is typing...
    </div>
  );
};
