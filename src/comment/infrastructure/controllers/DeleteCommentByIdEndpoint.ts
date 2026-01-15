import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { DeleteCommentById } from "../../application/use-cases/DeleteCommentById.ts";
import { CommentIdParamsDTO } from "./dtos/CommentIdParamsDTO.ts";

export function DeleteCommentByIdEndpoint(
  deleteCommentById: DeleteCommentById
): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/comment/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Deletes a comment",
        description:
          "Allows an user to delete a comment on a post. The user provides an id",
        responses: {
          200: { description: "Comment deleted successfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("param", CommentIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);

        await deleteCommentById.run(id, authenticatedUser);
        c.status(200);
        return c.json({ message: "Comment deleted successfully" });
      },
    ],
  };
}
