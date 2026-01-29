export const Avatar = ({
  src,
  name,
  size = 40,
}: {
  src?: string;
  name?: string;
  size?: number;
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    );
  }

  const initials =
    name
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-gray-300 flex items-center justify-center font-semibold"
    >
      {initials}
    </div>
  );
};
