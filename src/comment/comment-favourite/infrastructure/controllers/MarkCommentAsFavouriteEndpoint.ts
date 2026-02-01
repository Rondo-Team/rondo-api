import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import type { MarkCommentAsFavourite } from "../../application/MarkCommentAsFavourite.ts";
import { MarkCommentAsFavouriteRequestDTO } from "./dtos/MarkCommentAsFavouriteRequestDTO.ts";

export function MarkCommentAsFavouriteEndpoint(
  markCommentAsFavourite: MarkCommentAsFavourite
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/comment-favourites`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Marks a comment as favourite",
        description:
          "Allows to mark a comment as favourite. The user provides an unique id, and the commentId.",
        responses: {
          201: { description: "Comment marked as favourite succesfully" },
        },
        tags: [ApiTag.COMMENT],
      }),
      validator("json", MarkCommentAsFavouriteRequestDTO),
      async (c) => {
        const { id, commentId } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await markCommentAsFavourite.run(
          id,
          authenticatedUser,
          new Date(),
          commentId
        );
        c.status(201);
        return c.json({ message: "Comment marked as favourite succesfully" });
      },
    ],
  };
}
