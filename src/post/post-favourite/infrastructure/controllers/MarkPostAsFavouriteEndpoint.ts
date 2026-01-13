import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import { MarkPostAsFavourite } from "../../application/use-cases/MarkPostAsFavourite.ts";
import { MarkPostAsFavouriteRequestDTO } from "./dtos/MarkPostAsFavouriteRequestDTO.ts";

export function MarkPostAsFavouriteEndpoint(
  markPostAsFavourite: MarkPostAsFavourite
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/post-favourites`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Marks a post as favourite",
        description:
          "Allows to mark a post as favourite. The user provides an unique id, and the postId.",
        responses: {
          201: { description: "Post marked as favourite succesfully" },
        },
        tags: [ApiTag.POST],
      }),
      validator("json", MarkPostAsFavouriteRequestDTO),
      async (c) => {
        const { id, postId } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await markPostAsFavourite.run(
          id,
          authenticatedUser,
          new Date(),
          postId
        );
        c.status(201);
        return c.json({ message: "Post marked as favourite succesfully" });
      },
    ],
  };
}
