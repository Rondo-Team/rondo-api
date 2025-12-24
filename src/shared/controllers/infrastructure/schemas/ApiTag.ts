export const ApiTag = {
  USER: "User",
} as const;

export type ApiTag = (typeof ApiTag)[keyof typeof ApiTag];
