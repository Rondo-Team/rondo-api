import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { CommentIdParamsDTO } from "../../../infrastructure/controllers/dtos/CommentIdParamsDTO.ts";
import type { GetAllCommentFavouritesByCommentId } from "../../application/GetAllCommentFavouritesByCommentId.ts";

export function GetAllCommentFavouritesByCommentIdEndpoint(
  getAllCommentFavouritesByCommentId: GetAllCommentFavouritesByCommentId
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/comment-favourites/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all favourites for a comment by comment ID",
        description:
          "Allows to retrieve all favourites for a specific comment. The user provides an unique id.",
        responses: {
          200: { description: "Comment favourites retrieved successfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("param", CommentIdParamsDTO),
      async (c) => {
        const { id: commentId } = c.req.valid("param");
        const commentFavourites = await getAllCommentFavouritesByCommentId.run(
          commentId
        );
        c.status(200);
        return c.json(
          commentFavourites.map((commentFavourite) =>
            commentFavourite.toPrimitives()
          )
        );
      },
    ],
  };
}
