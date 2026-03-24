import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetUserById } from "../../application/use-cases/GetUserById.ts";
import { GetUserByIdResponseDTO } from "./dtos/GetUserByIdResponseDTO.ts";
import { UserIdParamsDTO } from "./dtos/UserIdParamsDTO.ts";

export function GetUserByIdEndpoint(getUserById: GetUserById): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/users/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets a User",
        description: "Allows getting a user information",
        responses: {
          201: {
            description: "User found",
            content: {
              "application/json": {
                schema: resolver(GetUserByIdResponseDTO),
              },
            },
          },
        },
        tags: [ApiTag.USER],
      }),
      validator("param", UserIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const user = await getUserById.run(id);
        // Set tokens in cookie
        return c.json({
          id: user?.id.toPrimitives(),
          username: user?.username.toPrimitives(),
          name: user?.name.toPrimitives(),
          profilePicture: user?.profilePicture.toPrimitives(),
          postsCount: user?.postsCount.toPrimitives(),
          proposalsCount: user?.proposalsCount.toPrimitives(),
          favouritePostsCount: user?.favouritePostsCount.toPrimitives(),
          commentsCount: user?.commentsCount.toPrimitives(),
          createdAt: user?.createdAt.toPrimitives(),
          recentlyViewedContent: user?.recentlyViewedContent.toPrimitives()
        });
      },
    ],
  };
}
