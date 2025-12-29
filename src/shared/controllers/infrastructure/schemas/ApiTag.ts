export const ApiTag = {
  USER: "User",
  AUTH: "AUTH",
} as const;

export type ApiTag = (typeof ApiTag)[keyof typeof ApiTag];
