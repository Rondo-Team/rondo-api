import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UpdatePost } from "../../application/use-cases/UpdatePost.ts";
import { PostIdParamsDTO } from "./dtos/PostIdParamsDTO.ts";
import { UpdatePostRequestDTO } from "./dtos/UpdatePostRequestDTO.ts";

export function UpdatePostEndpoint(updatePost: UpdatePost): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/posts/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a post",
        description:
          "Allows to update a post. The user provides the post id through params and new title, description, play or tags through body.",
        responses: {
          200: { description: "Post updated" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostIdParamsDTO),
      validator("json", UpdatePostRequestDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const { play, title, description, tags } = c.req.valid("json");

        await updatePost.run(
          id,
          authenticatedUser,
          play,
          title,
          description,
          tags,
        );
        c.status(200);

        return c.json({ message: "Post updated succesfully" });
      },
    ],
  };
}
