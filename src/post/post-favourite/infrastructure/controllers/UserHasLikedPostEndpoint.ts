import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UserHasLikedPost } from "../../application/use-cases/UserHasLikedPost.ts";
import { PostFavouriteIdParamsDTO } from "./dtos/PostFavouriteIdParamsDTO.ts";

export function UserHasLikedPostEndpoint(
  userHasLikedPost: UserHasLikedPost,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/post-favourites/me/post/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Checks if a given user has liked a post",
        description:
          "Allows to check if a given user has marked a post as favourite.",
        responses: {
          201: { description: "Like retrieved succesfully" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", PostFavouriteIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);

        const isLiked = await userHasLikedPost.run(
          id,
          authenticatedUser,
          authenticatedUser,
        );
        c.status(201);
        return c.json({ isLiked: isLiked });
      },
    ],
  };
}
