export type UserRole = "student" | "instructor";

interface AiRatingApiUser {
  id: string;
  name?: string;
  email?: string;
  role?: UserRole;
}

interface AiRatingApiItem {
  ratingId: string;
  rating: number;
  createdAt: string;
  user: AiRatingApiUser;
}

export interface AiRatingsApiResponse {
  message: string;
  data: AiRatingApiItem[];
}
