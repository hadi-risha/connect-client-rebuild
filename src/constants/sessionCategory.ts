export const SessionCategory = {
  SCIENCE : "Science",
  TECHNOLOGY : "Technology",
  MATHEMATICS : "Mathematics",
  HISTORY : "History",
  LANGUAGES : "Languages",
  BUSINESS : "Business",
  FINANCE : "Finance",
  PERSONAL_DEVELOPMENT : "Personal_development",
  ARTS : "Arts",
} as const;

export type SessionCategory =
  typeof SessionCategory[keyof typeof SessionCategory];