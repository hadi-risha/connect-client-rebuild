// all non-chatted peoples and groups result fetch here
import { useEffect, useState } from "react";
import { UserResultItem } from "./UserResultItem";
import { GroupResultItem } from "./GroupResultItem";
import type { ChatUser, ChatRoom } from "../../../features/chat/chat.types";
import type { NewChatMode } from "../layout/NewChatLayout";
import { discoverGroupsApi, discoverUsersApi } from "../../../api/chat.api";
import EmptyState from "../../ui/EmptyState";
import { UserX, Users } from "lucide-react";

interface Props {
  query: string;
  mode: NewChatMode;
}

export const NewChatResults = ({ query, mode }: Props) => {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [groups, setGroups] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        if (mode === "one_to_one") {
          const { data } = await discoverUsersApi(query);
          if (!cancelled) setUsers(data.users);
        } else {
          const { data } = await discoverGroupsApi(query);
          if (!cancelled) setGroups(data.groups);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [query, mode]);

  if (loading) {
    return <p className="p-4 text-gray-500">Loading...</p>;
  }

  /* ---------------- ONE TO ONE ---------------- */
  if (mode === "one_to_one") {
    if (users.length === 0) {
      return (
        <EmptyState
          icon={<UserX size={48} />}
          title="No users found"
          description={
            query
              ? "Try searching with a different name or email."
              : "There are no users available to start a new chat."
          }
        />
      );
    }

    return (
      <div className="flex-1 overflow-y-auto">
        {users.map(u => (
          <UserResultItem
            key={u._id}
            id={u._id}
            name={u.name}
            email={u.email!}
            imageUrl={u.profilePicture?.url}
          />
        ))}
      </div>
    );
  }



  /* ---------------- GROUPS ---------------- */
  return (
    <div className="flex-1 overflow-y-auto">
      {/* EMPTY STATE */}
      {groups.length === 0 ? (
        <EmptyState
          icon={<Users size={48} />}
          title="No groups found"
          description={
            query
              ? "No public groups match your search."
              : "You can create the first group."
          }
        />
      ) : (
        groups.map(g => (
          <GroupResultItem
            key={g._id}
            id={g._id}
            name={g.name!}
            description={truncate(g.description)}
            imageUrl={g.image?.url}
          />
        ))
      )}
    </div>
  );
};


const truncate = (text?: string, max = 60) =>
  text && text.length > max ? text.slice(0, max) + "..." : text;

