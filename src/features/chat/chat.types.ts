export interface ChatUser {
  _id: string;
  name: string;
  email?: string;
  profilePicture?: {
    url?: string;
  };
}

export interface MessageReaction {
  emoji: string;
  users: string[]; 
}

export interface Message {
  _id: string;
  chatRoom: string;
  sender: ChatUser; // given the str for fallback
  type: "text" | "image" | "audio";
  content?: string;
  image?: { url: string };
  audio?: { url: string; duration?: number };
  replyTo?: Message;
  reactions: MessageReaction[];
  isDeleted: boolean;
  createdAt: string;
}

export interface ChatRoom {
  _id: string;
  type: "one_to_one" | "group";
  members: ChatUser[];
  owner?: ChatUser;
  admins?: ChatUser[];
  name?: string;
  description?: string;
  image?: { url?: string; key?: string; };
  isPublic?: boolean;
  lastMessage?: Message;
  lastRead?: {
    user: string;
    message: string;
    readAt: string;
  }[];
}

