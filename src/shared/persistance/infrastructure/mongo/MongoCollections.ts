export const MongoCollections = {
  USERS: "users",
  DRAFTS: "drafts",
  POSTS: "posts"
} as const;

export type MongoCollections = (typeof MongoCollections)[keyof typeof MongoCollections];
