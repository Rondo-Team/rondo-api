import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { GetPostsByCriteria } from "../../application/use-cases/GetPostsByCriteria.ts";
import { GetPostsByCriteriaRequestQueryParamsDTO } from "./dtos/GetPostsByCriteriaRequestQueryParamsDTO.ts";

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
          "Allows to get multiple posts by query or filters. The user provides through query params optionals query, tags, minCreationDate and minFavourites.",
        responses: {
          200: { description: "Posts returned" },
        },
        tags: [ApiTag.POST],
      }),
      validator("query", GetPostsByCriteriaRequestQueryParamsDTO),
      async (c) => {
        const { query, tags, minCreationDate, minFavourites } =
          c.req.valid("query");
        const posts = await getPostsByCriteria.run(query, {
          tags,
          minCreationDate,
          minFavourites,
        });
        c.status(200);
        return c.json(posts.map((post) => post.toPrimitives()));
      },
    ],
  };
}
