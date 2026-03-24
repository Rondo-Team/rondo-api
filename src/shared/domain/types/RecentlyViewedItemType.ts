export const RecentlyViewedItemType = {
  POST: "post",
  DRAFT: "draft",
} as const;

export type RecentlyViewedItemType =
  (typeof RecentlyViewedItemType)[keyof typeof RecentlyViewedItemType];
