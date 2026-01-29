export const AudioPreview = ({
  blob,
  onRemove,
}: {
  blob: Blob;
  onRemove: () => void;
}) => {
  const url = URL.createObjectURL(blob);

  return (
    <div className="flex items-center gap-2">
      <audio controls src={url} />
      <button onClick={onRemove}>✕</button>
    </div>
  );
};
