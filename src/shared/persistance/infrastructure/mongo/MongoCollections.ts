export const MongoCollections = {
  USERS: "users",
  DRAFTS: "drafts",
  POSTS: "posts",
  POSTS_FAVOURITES: "postFavourites",
  COMMENTS: "comments"
} as const;

export type MongoCollections =
  (typeof MongoCollections)[keyof typeof MongoCollections];
