import type { Role } from "../../constants/roles";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;

  profilePicture?: {
    key?: string;
    url?: string;
  };        
  instructorProfile?: {
    bio?: string;
    expertise?: string;
  };
}

export interface UserState {
  user: User | null
}