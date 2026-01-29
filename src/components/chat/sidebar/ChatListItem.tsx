import type { ChatRoom } from "../../../features/chat/chat.types";
import { useAppSelector } from "../../../hooks/redux";
import { Avatar } from "../common/Avatar";

type Props = {
  chat: ChatRoom;
  active: boolean;
  onClick: () => void;
};

export const ChatListItem = ({ chat, active, onClick }: Props) => {
  const currentUser = useAppSelector(state => state.user.user);

  const otherUser =
    chat.type === "one_to_one"
      ? chat.members.find(m => m._id !== currentUser?._id)
      : null;

  const title =
    chat.type === "group"
      ? chat.name
      : otherUser?.name ?? "Unknown user";

  const avatar =
    chat.type === "group"
      ? chat.image?.url
      : otherUser?.profilePicture?.url;
 
  // message preview
  const preview = (() => {
    if (!chat.lastMessage) return "No messages yet";

    if (chat.lastMessage.type === "text") {
      const text = chat.lastMessage.content ?? "";
      return text.length > 40
        ? text.slice(0, 45) + "..."
        : text;
    }

    if (chat.lastMessage.type === "image") {
      return "📷 Photo";
    }

    if (chat.lastMessage.type === "audio") {
      return "🎤 Voice message";
    }

    return "New message";
  })();

  // date and time
  const getFormattedTime = (dateString?: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();

    const isToday =
      date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
      date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) return `Today · ${time}`;
    if (isYesterday) return `Yesterday · ${time}`;

    const formattedDate = date.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    return `${formattedDate} · ${time}`;
  };

  const timeLabel = getFormattedTime(chat.lastMessage?.createdAt);


  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 cursor-pointer
        ${active ? "bg-gray-100" : "hover:bg-gray-50"}`}
    >
      <Avatar src={avatar} name={title} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="font-medium truncate">{title}</div>
          {timeLabel && (
            <div className="text-[10px] text-gray-400 whitespace-nowrap">
              {timeLabel}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 truncate">
          {preview}
        </div>
      </div>
    </div>
  );
};
