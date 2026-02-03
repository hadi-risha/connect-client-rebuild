type Props = {
  status: "SENT" | "READ" | null;
};

export const ReadTicks = ({ status }: Props) => {
  if (!status) return null;

  if (status === "READ") {
    return <span className="text-blue-500">✔✔</span>;
  }

  return <span className="text-gray-400">✔</span>;
};
