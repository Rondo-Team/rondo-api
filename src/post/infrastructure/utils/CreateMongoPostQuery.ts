/* eslint-disable @typescript-eslint/no-explicit-any */
export function createMongoPostQuery(query, filters) {
  const mongoQuery: any = {};
  const conditions: any[] = [];

  if (query)
    conditions.push({
      $text: {
        $search: query,
      },
    });

  if (filters?.tags)
    conditions.push({
      tags: { $in: filters.tags },
    });

  if (filters?.minCreationDate)
    conditions.push({
      createdAt: { $gte: new Date(filters.minCreationDate) },
    });

  if (filters?.minFavourites)
    conditions.push({
      favouritesPostCount: { $gte: filters.minFavourites },
    });

  if (conditions.length > 0) mongoQuery.$and = conditions;
  return mongoQuery;
}
