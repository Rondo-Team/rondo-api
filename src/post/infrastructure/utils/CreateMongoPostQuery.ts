/* eslint-disable @typescript-eslint/no-explicit-any */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function createContainsRegex(value: string): RegExp {
  return new RegExp(escapeRegex(value), "i");
}

export function createMongoPostQuery(
  query,
  filters,
  matchedUserIds: string[] = [],
) {
  const mongoQuery: any = {};
  const conditions: any[] = [];

  if (query) {
    const regex = createContainsRegex(query);
    const orConditions: any[] = [{ title: regex }, { description: regex }];

    if (matchedUserIds.length > 0) {
      orConditions.push({ userId: { $in: matchedUserIds } });
    }

    conditions.push({
      $or: orConditions,
    });
  }

  if (filters?.tags)
    conditions.push({
      tags: { $in: filters.tags },
    });

  if (filters?.minCreationDate)
    conditions.push({
      createdAt: { $gte: filters.minCreationDate },
    });

  if (filters?.minFavourites)
    conditions.push({
      favouritesCount: { $gte: filters.minFavourites },
    });

  if (conditions.length > 0) mongoQuery.$and = conditions;
  return mongoQuery;
}
