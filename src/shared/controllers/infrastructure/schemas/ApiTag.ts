export const ApiTag = {
  USER: "User",
  AUTH: "Auth",
  DRAFT: "Draft",
  POST: "Post",
  COMMENT: "Comment",
  PROPOSAL: "Proposal",
} as const;

export type ApiTag = (typeof ApiTag)[keyof typeof ApiTag];
