import { useState } from "react";
import { NewChatHeader } from "../newChat/NewChatHeader";
import { ChatTypeTabs } from "../newChat/ChatTypeTabs";
import { NewChatResults } from "../newChat/NewChatResults";

export type NewChatMode = "one_to_one" | "group";

export const NewChatLayout = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<NewChatMode>("one_to_one");

  return (
    <div className="w-6/12 mx-auto min-h-[85vh] flex flex-col border bg-white">
      <NewChatHeader query={query} onQueryChange={setQuery} />
      <ChatTypeTabs mode={mode} onChange={setMode} />
      <NewChatResults query={query} mode={mode} />
    </div>
  );
};
