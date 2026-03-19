import type { SortOrder } from "./SortOrder.ts";

export type PaginationOptions<T extends string = string> = {
  page: number;
  limit: number;
  sortBy?: T;
  sortOrder?: SortOrder;
};
