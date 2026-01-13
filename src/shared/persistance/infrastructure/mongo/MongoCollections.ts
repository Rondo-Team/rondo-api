export const MongoCollections = {
  USERS: "users",
  DRAFTS: "drafts",
  POSTS: "posts",
  POSTS_FAVOURITES: "postFavourites",
} as const;

export type MongoCollections =
  (typeof MongoCollections)[keyof typeof MongoCollections];
