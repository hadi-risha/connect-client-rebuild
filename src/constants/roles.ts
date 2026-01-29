export const Role = {
  STUDENT: "student",
  INSTRUCTOR: "instructor",
  ADMIN: "admin",
} as const;

export type Role = typeof Role[keyof typeof Role];
