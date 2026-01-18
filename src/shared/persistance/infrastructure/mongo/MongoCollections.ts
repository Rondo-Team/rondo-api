export const MongoCollections = {
  USERS: "users",
  DRAFTS: "drafts",
  POSTS: "posts",
  POSTS_FAVOURITES: "postFavourites",
  COMMENTS: "comments",
  COMMENT_FAVOURITES: "commentFavourites",
  PROPOSALS: "proposals",
} as const;

export type MongoCollections =
  (typeof MongoCollections)[keyof typeof MongoCollections];
