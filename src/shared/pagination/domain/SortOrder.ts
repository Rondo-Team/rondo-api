export const SortOrder = {
  ASC: "asc",
  DESC: "desc"
}

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]