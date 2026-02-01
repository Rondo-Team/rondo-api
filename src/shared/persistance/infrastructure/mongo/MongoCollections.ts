export const MongoCollections = {
  USERS: "users",
  DRAFTS: "drafts",
  POSTS: "posts",
  POSTS_FAVOURITES: "postFavourites",
  COMMENTS: "comments",
  COMMENT_FAVOURITES: "commentFavourites",
  PROPOSALS: "proposals",
  ACTIVITY_PROPOSAL_HISTORY_ENTRIE: "activityProposalHistoryEntrie",
  REPLY_PROPOSAL_HISTORY_ENTRIE: "replyProposalHistoryEntrie"
} as const;

export type MongoCollections =
  (typeof MongoCollections)[keyof typeof MongoCollections];
