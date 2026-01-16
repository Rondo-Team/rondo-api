import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UnmarkCommentAsFavourite } from "../../application/UnmarkCommentAsFavourite.ts";
import { CommentFavouriteIdParamsDTO } from "./dtos/CommentFavouriteIdParamsDTO.ts";

export function UnmarkCommentAsFavouriteEndpoint(
  unmarkCommentAsFavourite: UnmarkCommentAsFavourite
): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/comment-favourites/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Unmarks a comment as favourite",
        description:
          "Allows to unmark a comment as favourite. The user provides an unique id.",
        responses: {
          200: { description: "Comment unmarked as favourite succesfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("param", CommentFavouriteIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        await unmarkCommentAsFavourite.run(id, authenticatedUser);
        c.status(200);
        return c.json({ message: "Comment unmarked as favourite succesfully" });
      },
    ],
  };
}
