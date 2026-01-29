import { reactToMessageSocket } from "../../../socket/chat.emitters";
import { useAppSelector } from "../../../hooks/redux";

const EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

type Props = {
  messageId: string;
  onReact: () => void;
};

export const ReactionPicker = ({ messageId, onReact }: Props) => {
  const chatId = useAppSelector(state => state.chat.selectedChat?._id);

  const react = (emoji: string) => {
    if (!chatId) return;
    reactToMessageSocket(chatId, messageId, emoji);
    onReact();
  };

  return (
    <div
      className="absolute  left-0 bg-white shadow rounded-full px-2 py-1 flex gap-1 z-20"
    >
      {EMOJIS.map(e => (
        <button
          key={e}
          onClick={() => react(e)}
          className="hover:scale-125 transition text-sm"
        >
          {e}
        </button>
      ))}
    </div>
  );
};
