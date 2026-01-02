export const ApiTag = {
  USER: "User",
  AUTH: "Auth",
  DRAFT: "Draft",
  POST: "Post"
} as const;

export type ApiTag = (typeof ApiTag)[keyof typeof ApiTag];
