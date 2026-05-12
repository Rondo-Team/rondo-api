import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetAllCommentFavouritesByUserIdAndPostId } from "../../application/GetAllCommentFavouritesByUserIdAndPostId.ts";
import { GetAllCommentFavouritesByUserIdAndPostIdQueryParamsDTO } from "./dtos/GetAllCommentFavouritesByUserIdAndPostIdQueryParamsDTO.ts";

export function GetAllCommentFavouritesByUserIdAndPostIdEndpoint(
  getAllCommentFavouritesByUserIdAndPostId: GetAllCommentFavouritesByUserIdAndPostId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/comment-favourites`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all comment favourites of a userId in a certain post",
        description:
          "Allows to retrieve all comment favourites of a userId in a certain post",
        responses: {
          200: { description: "Comment favourites retrieved successfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator(
        "query",
        GetAllCommentFavouritesByUserIdAndPostIdQueryParamsDTO,
      ),

      async (c) => {
        const { userId, postId } = c.req.valid("query");
        const commentFavourites =
          await getAllCommentFavouritesByUserIdAndPostId.run(userId, postId);
        c.status(200);
        return c.json(
          commentFavourites.map((commentFavourite) =>
            commentFavourite.toPrimitives(),
          ),
        );
      },
    ],
  };
}
