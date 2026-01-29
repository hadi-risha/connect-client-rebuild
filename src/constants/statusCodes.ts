export const StatusCode = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;

export type StatusCode =
  typeof StatusCode[keyof typeof StatusCode];
