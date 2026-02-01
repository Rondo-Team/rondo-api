export const TokenPurpose = {
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
} as const;

export type TokenPurpose = (typeof TokenPurpose)[keyof typeof TokenPurpose];
