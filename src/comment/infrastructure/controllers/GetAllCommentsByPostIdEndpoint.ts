import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { PostIdParamsDTO } from "../../../post/infrastructure/controllers/dtos/PostIdParamsDTO.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetAllCommentsByPostId } from "../../application/use-cases/GetAllCommentsByPostId.ts";

export function GetAllCommentsByPostIdEndpoint(
  getAllCommentsByPostId: GetAllCommentsByPostId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/comment/post/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Get all comments from a post",
        description:
          "Allows an user to get all comments on a post. The user provides a postId",
        responses: {
          200: { description: "Comments retrieved successfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("param", PostIdParamsDTO),
      async (c) => {
        const { id: postId } = c.req.valid("param");
        const comments = await getAllCommentsByPostId.run(postId);

        c.status(200);
        return c.json(comments);
      },
    ],
  };
}
