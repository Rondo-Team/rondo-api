import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { PostIdParamsDTO } from "../../../infrastructure/controllers/dtos/PostIdParamsDTO.ts";
import type { GetAllPostFavouritesByPostId } from "../../application/use-cases/GetAllPostFavouritesByPostId.ts";

export function GetAllFavouritesByPostIdEndpoint(
  getAllFavouritesByPostId: GetAllPostFavouritesByPostId
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/post-favourites/post/:id`,
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
      validator("param", PostIdParamsDTO),
      async (c) => {
        const { id: postId } = c.req.valid("param");
        const favourites = await getAllFavouritesByPostId.run(postId);
        c.status(200);
        return c.json(favourites.map((favourite) => favourite.toPrimitives()));
      },
    ],
  };
}
