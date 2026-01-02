import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { GetPostsByCriteria } from "../../application/use-cases/GetPostsByCriteria.ts";
import { GetPostsByCriteriaRequestParamsDTO } from "./dtos/GetPostsByCriteriaRequestParamsDTO.ts";

export function GetPostsByCriteriaEnpoint(
  getPostsByCriteria: GetPostsByCriteria
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/posts`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets posts that match with the criteria",
        description:
          "Allows to get multiple posts by query or filters. The user provides those query and filters.",
        responses: {
          200: { description: "Post found" },
        },
        tags: [ApiTag.POST],
      }),
      validator("query", GetPostsByCriteriaRequestParamsDTO),
      async (c) => {
        // Filters come encoded as Base64 so we have to decode
        const { query, filters } = c.req.valid("query");
        const posts = await getPostsByCriteria.run(
          query,
          // If query has filters, decode them
          filters ? JSON.parse(atob(filters)) : filters
        );
        c.status(200);
        return c.json(posts.map((post) => post.toPrimitives()));
      },
    ],
  };
}
