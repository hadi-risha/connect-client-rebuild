const UnisexAvatar = ({ size = 40 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="64" cy="64" r="64" fill="#CBD5E1" />
      <circle cx="64" cy="50" r="24" fill="#94A3B8" />
      <path
        d="M24 116c0-22 18-36 40-36s40 14 40 36"
        fill="#94A3B8"
      />
    </svg>
  );
};

export default UnisexAvatar;
