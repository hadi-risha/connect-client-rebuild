import { useAppSelector } from "../../../hooks/redux";
import { reactToMessageSocket } from "../../../socket/chat.emitters";
import type { MessageReaction } from "../../../features/chat/chat.types";

type Props = {
  messageId: string;
  reactions: MessageReaction[];
};

export const ReactionBar = ({ messageId, reactions }: Props) => {
  const myId = useAppSelector(state => state.user.user?._id);
  const chatId = useAppSelector(state => state.chat.selectedChat?._id);

  if (!reactions.length || !myId) return null;
  
  // normalize reactions so current user
  // appears in ONLY ONE emoji (latest one)
  let myReactionEmoji: string | null = null;

  reactions.forEach(r => {
    if (r.users.includes(myId)) {
      myReactionEmoji = r.emoji;
    }
  });

  const normalizedReactions = reactions
    .map(r => {
      if (!myReactionEmoji) return r;

      if (r.emoji === myReactionEmoji) {
        return r;
      }

      return {
        ...r,
        users: r.users.filter(id => id !== myId),
      };
    })
    .filter(r => r.users.length > 0);

  const handleReact = (emoji: string) => {
    if (!chatId) return;
    reactToMessageSocket(chatId, messageId, emoji);
  };

  return (
    <div className="flex gap-1 mt-1 flex-wrap">
      {normalizedReactions.map(r => {
        const reactedByMe = r.users.includes(myId);

        return (
          <button
            key={r.emoji}
            onClick={() => handleReact(r.emoji)}
            className={`flex items-center gap-1 px-2 py-[2px] rounded-full text-xs
              border transition
              ${
                reactedByMe
                  ? "bg-blue-100 border-blue-400 text-blue-700"
                  : "bg-gray-100 border-gray-300 hover:bg-gray-200"
              }`}
          >
            <span>{r.emoji}</span>
            <span>{r.users.length}</span>
          </button>
        );
      })}
    </div>
  );
};
