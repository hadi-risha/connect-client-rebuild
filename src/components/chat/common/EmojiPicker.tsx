const EMOJIS = ["😀", "😂", "😍", "👍", "🔥", "😢", "🎉", "❤️"];

export const EmojiPicker = ({
  open,
  onSelect,
  onClose,
}: {
  open: boolean;
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="absolute bottom-16 bg-white border rounded-lg shadow p-2">
      <div className="grid grid-cols-4 gap-2">
        {EMOJIS.map(e => (
          <button
            key={e}
            onClick={() => {
              onSelect(e);
              onClose();
            }}
            className="text-xl"
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  );
};
