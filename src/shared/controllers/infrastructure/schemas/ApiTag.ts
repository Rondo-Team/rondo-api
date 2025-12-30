export const ApiTag = {
  USER: "User",
  AUTH: "AUTH",
  DRAFT: "DRAFT",
} as const;

export type ApiTag = (typeof ApiTag)[keyof typeof ApiTag];
