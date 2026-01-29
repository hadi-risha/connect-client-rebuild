import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { EmojiPicker } from "../common/EmojiPicker";
import { ImagePreview } from "./ImagePreview";
import { AudioPreview } from "./AudioPreview";
import { clearReplyTo } from "../../../features/chat/chatSlice";
import { ReplyPreview } from "../message/ReplyPreview";
import { sendMessageSocket, typingStartSocket, typingStopSocket } from "../../../socket/chat.emitters";

export const ChatInput = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(state => state.chat.selectedChat);
  const replyTo = useAppSelector(state => state.chat.replyToMessage);
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  if (!chat) return null;

  const handleSend = () => {
    if (!text && !image && !audio) return;
    let type: "text" | "image" | "audio";

    if (image) type = "image";
    else if (audio) type = "audio";
    else type = "text";

    sendMessageSocket({
      chatRoomId: chat._id,
      type, 
      content: type === "text" ? text : undefined,
      replyTo: replyTo?._id,
    });

    setText("");
    setImage(null);
    setAudio(null);
    dispatch(clearReplyTo());
  };

  return (
    <div className="p-3 border-t space-y-2">
      {/* previews */}
      {image && <ImagePreview file={image} onRemove={() => setImage(null)} />}
      {audio && <AudioPreview blob={audio} onRemove={() => setAudio(null)} />}

      <div className="flex items-center gap-2">
        <EmojiPicker
          open={showEmoji}
          onSelect={emoji => setText(t => t + emoji)}
          onClose={() => setShowEmoji(false)}
        />

        <button onClick={() => setShowEmoji(v => !v)} className="cursor-pointer">😊</button>
        
        <ReplyPreview />
        {/* <ImageInput onSelect={setImage} /> */}
        {/* <AudioRecorder onRecorded={setAudio} /> */}

        <input
          value={text}
          onChange={e => {
            setText(e.target.value);
            typingStartSocket(chat._id);
          }}
          onBlur={() => typingStopSocket(chat._id)}
          className="flex-1 border rounded-lg px-3 py-3"
          placeholder="Type a message..."
        />

        <button onClick={handleSend} className="btn-primary cursor-pointer hover:shadow">
          Send
        </button>
      </div>
    </div>
  );
};
