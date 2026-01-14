import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UnmarkPostAsFavourite } from "../../application/use-cases/UnmarkPostAsFavourite.ts";
import { PostFavouriteIdParamsDTO } from "./dtos/PostFavouriteIdParamsDTO.ts";

export function UnmarkPostAsFavouriteEndpoint(
  unmarkPostAsFavourite: UnmarkPostAsFavourite
): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/post-favourites/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Unmarks a post as favourite",
        description:
          "Allows to mark a post as favourite. The user provides the post favourite id by params.",
        responses: {
          201: { description: "Post unmarked as favourite succesfully" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostFavouriteIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);

        await unmarkPostAsFavourite.run(id, authenticatedUser);
        c.status(201);
        return c.json({ message: "Post unmarked as favourite succesfully" });
      },
    ],
  };
}
