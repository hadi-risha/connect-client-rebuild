import type { NewChatMode } from "../layout/NewChatLayout";

interface Props {
  mode: NewChatMode;
  onChange: (mode: NewChatMode) => void;
}

export const ChatTypeTabs = ({ mode, onChange }: Props) => {
  return (
    <div className="flex border-b">
      <Tab
        active={mode === "one_to_one"}
        onClick={() => onChange("one_to_one")}
      >
        1-on-1
      </Tab>

      <Tab
        active={mode === "group"}
        onClick={() => onChange("group")}
      >
        Groups
      </Tab>
    </div>
  );
};

const Tab = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-medium ${
        active
          ? "border-b-2 border-blue-500 text-blue-600"
          : "text-gray-500 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
};
