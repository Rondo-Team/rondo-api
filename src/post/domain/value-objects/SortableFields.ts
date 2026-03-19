export const SortableFields = {
  CREATED_AT: "createdAt",
  TITLE: "title",
  FAVOURITES_COUNT: "favouritesCount",
  COMMENTS_COUNT: "commentsCount",
  PROPOSALS_COUNT: "proposalsCount",
};

export type SortableFields =
  (typeof SortableFields)[keyof typeof SortableFields];
