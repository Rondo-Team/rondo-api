import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { DeletePostById } from "../../application/use-cases/DeletePostById.ts";
import { PostIdParamsDTO } from "./dtos/PostIdParamsDTO.ts";

export function DeletePostByIdEndpoint(deletePostById: DeletePostById): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/posts/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Deletes a post",
        description:
          "Allows to delete a post by its id. The user provides an unique id.",
        responses: {
          200: { description: "Post deleted" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);

        await deletePostById.run(id, authenticatedUser);
        c.status(200);

        return c.json({ message: "Post deleted" });
      },
    ],
  };
}
