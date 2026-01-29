import { useAppSelector } from "../../../hooks/redux";
import { getDateLabel } from "../../../utils/chatDate";
import { MessageItem } from "./MessageItem";
import { TypingIndicator } from "./TypingIndicator";
import { useEffect, useRef, useState } from "react";

export const MessageList = () => {
  const messages = useAppSelector(state => state.chat.messages);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  let lastDateLabel: string | null = null;

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const nearBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 120;

    setShouldAutoScroll(nearBottom);
  };

  useEffect(() => {
    if (shouldAutoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, shouldAutoScroll]);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
  }, []);


  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 space-y-2"
    >
      {messages.map(message => {
        const dateLabel = getDateLabel(message.createdAt);
        const showDateDivider = dateLabel !== lastDateLabel;
        lastDateLabel = dateLabel;

        return (
          <div key={message._id}>
            {showDateDivider && (
              <div className="flex justify-center my-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {dateLabel}
                </span>
              </div>
            )}

            <MessageItem message={message} />
          </div>
        );
      })}

      <TypingIndicator />

      {/* invisible anchor */}
      <div ref={bottomRef} />
    </div>
  );
};

