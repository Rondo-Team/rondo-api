export const RecentlyViewedItemType = {
  POST: "POST",
  DRAFT: "DRAFT",
} as const;

export type RecentlyViewedItemType =
  (typeof RecentlyViewedItemType)[keyof typeof RecentlyViewedItemType];
