export const ImagePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const url = URL.createObjectURL(file);

  return (
    <div className="relative inline-block">
      <img src={url} className="h-24 rounded-lg" />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-black/60 text-white rounded-full px-2"
      >
        ✕
      </button>
    </div>
  );
};
