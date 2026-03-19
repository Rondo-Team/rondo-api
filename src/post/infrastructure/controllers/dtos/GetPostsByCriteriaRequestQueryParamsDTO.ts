import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";

extendZodWithOpenApi(z);

export const GetPostsByCriteriaRequestQueryParamsDTO = z
  .object({
    page: z.coerce.number().int().min(1).openapi({ example: 1 }),
    limit: z.coerce.number().int().min(1).openapi({ example: 10 }),
    sortBy: z.string().optional().openapi({ example: "createdAt" }),
    sortOrder: z.string().optional().openapi({ example: "desc" }),
    query: z.string().min(1).optional().openapi({ example: "sample search" }),
    tags: z
      .preprocess(
        (val) => {
          if (typeof val === "string") return [val];
          if (Array.isArray(val)) return val;
          return undefined;
        },
        z.array(z.string().min(1)).optional(),
      )
      .openapi({ example: ["433", "attacking"] }),

    minCreationDate: z
      .preprocess((val) => {
        if (typeof val === "string") {
          const date = new Date(val);
          return isNaN(date.getTime()) ? undefined : date;
        }
        return undefined;
      }, z.date().optional())
      .openapi({
        example: "2025-01-09",
        description: "Minimum creation date in ISO String",
      }),

    minFavourites: z.coerce.number().int().optional().openapi({ example: 0 }),
  })
  .openapi({
    description: "Query params for searching posts with optional filters",
  });
