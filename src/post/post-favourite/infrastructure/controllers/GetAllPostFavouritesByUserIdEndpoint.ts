import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import { UserIdParamsDTO } from "../../../../user/infrastructure/controllers/dtos/UserIdParamsDTO.ts";
import type { GetAllPostFavouritesByUserId } from "../../application/use-cases/GetAllPostFavouritesByUserId.ts";

export function GetAllFavouritesByUserIdEndpoint(
  getAllFavouritesByUserId: GetAllPostFavouritesByUserId
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/post-favourites/user/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Get all favourites from a post",
        description:
          "Allows to get all favourites from a post . The user provides an unique postId in params.",
        responses: {
          201: { description: "Favourites fetched succesfully" },
        },
        tags: [ApiTag.POST],
      }),
      validator("param", UserIdParamsDTO),
      async (c) => {
        const { id: userId } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const postFavourites = await getAllFavouritesByUserId.run(
          userId,
          authenticatedUser
        );
        c.status(200);
        return c.json(
          postFavourites.map((postFavourite) => postFavourite.toPrimitives())
        );
      },
    ],
  };
}
