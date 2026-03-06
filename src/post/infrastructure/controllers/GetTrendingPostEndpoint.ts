import { describeRoute } from "hono-openapi";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetTrendingPost } from "../../application/use-cases/GetTrendingPost.ts";

export function GetTrendingPostEndpoint(
  getTrendingPost: GetTrendingPost,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/trending-post`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets the best rated post in the last 7 days",
        description:
          "Allows to get a the bes rated post in the last 7 days information, if no post is found it looks in as 30 days, if dont then its the best post ever.",
        responses: {
          200: { description: "Post found" },
        },
        tags: [ApiTag.POST],
      }),
      async (c) => {
        const post = await getTrendingPost.run();
        c.status(200);
        return c.json(post);
      },
    ],
  };
}
