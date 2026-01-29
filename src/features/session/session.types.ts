export interface SessionImage {
  key?: string;
  url?: string;
}

export interface Session {
  _id?: string;
  title: string;
  introduction: string;
  description: string;

  bulletPoints?: string[];
  coverPhoto?: SessionImage;
  duration: number;
  fees: number;
  timeSlots: string[]; // date arr in db
  category: string;

  instructorId?: string,
  isArchived?: boolean,

  isWishlisted?: boolean;
}

export interface SessionState {
  current: Session | null;
  loading: boolean;
}