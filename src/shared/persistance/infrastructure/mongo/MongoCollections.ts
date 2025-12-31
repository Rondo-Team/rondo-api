export const MongoCollections = {
  USERS: "users",
  DRAFTS: "drafts",
} as const;

export type MongoCollections = (typeof MongoCollections)[keyof typeof MongoCollections];
