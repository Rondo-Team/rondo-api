import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { UserIdParamsDTO } from "../../../user/infrastructure/controllers/dtos/UserIdParamsDTO.ts";
import type { GetAllPostsByUserId } from "../../application/use-cases/GetAllPostsByUserId.ts";

export function GetAllPostsByUserIdEndpoint(
  getAllPostsByUserId: GetAllPostsByUserId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/posts/all/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all posts from a user",
        description:
          "Allows to get all posts from a user by its id. The user provides an unique userId.",
        responses: {
          200: { description: "Post found" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", UserIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const posts = await getAllPostsByUserId.run(id);
        c.status(200);
        return c.json(posts);
      },
    ],
  };
}
