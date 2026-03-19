import { SortableFields } from "../../domain/value-objects/SortableFields.ts";

export function mapSortableFieldToMongo(
  sortOrder: 1 | -1,
  sortBy?: SortableFields,
): Record<string, 1 | -1> {
  if (!sortBy) return { createdAt: sortOrder };
  return { [sortBy]: sortOrder };
}
