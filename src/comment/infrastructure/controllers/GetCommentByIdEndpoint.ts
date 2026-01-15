import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetCommentById } from "../../application/use-cases/GetCommentById.ts";
import { CommentIdParamsDTO } from "./dtos/CommentIdParamsDTO.ts";

export function GetCommentByIdEndpoint(
  getCommentById: GetCommentById
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/comment/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Get a comment by id",
        description:
          "Allows an user to get a comment by its id, the user provides de id",
        responses: {
          200: { description: "Comment retrieved successfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("param", CommentIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const comment = await getCommentById.run(id);

        c.status(200);
        return c.json(comment.toPrimitives());
      },
    ],
  };
}
