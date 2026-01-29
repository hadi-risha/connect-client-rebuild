export const ImageInput = ({ onSelect }: { onSelect: (f: File) => void }) => {
  return (
    <label className="cursor-pointer">
      📷
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
        }}
      />
    </label>
  );
};
