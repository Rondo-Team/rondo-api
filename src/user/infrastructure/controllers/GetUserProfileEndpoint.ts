import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { GetUserById } from "../../application/use-cases/GetUserById.ts";
import { GetUserProfileResponseDTO } from "./dtos/GetUserProfileResponseDTO.ts";

export function GetUserProfileEndpoint(getUserById: GetUserById): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/users/me/profile`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets user profile",
        description: "Allows getting user information",
        responses: {
          201: {
            description: "User found",
            content: {
              "application/json": {
                schema: resolver(GetUserProfileResponseDTO),
              },
            },
          },
        },
        tags: [ApiTag.USER],
      }),
      async (c) => {
        const userId = getAuthenticatedUserId(c);
        const user = await getUserById.run(userId);
        return c.json({
          id: user?.id.toPrimitives(),
          email: user?.email.toPrimitives(),
          username: user?.username.toPrimitives(),
          name: user?.name.toPrimitives(),
          profilePicture: user?.profilePicture.toPrimitives(),
          postsCount: user?.postsCount.toPrimitives(),
          proposalsCount: user?.proposalsCount.toPrimitives(),
          favouritePostsCount: user?.favouritePostsCount.toPrimitives(),
          commentsCount: user?.commentsCount.toPrimitives(),
          createdAt: user?.createdAt.toPrimitives(),
          usernameChangedAt: user?.usernameChangedAt.toPrimitives(),
        });
      },
    ],
  };
}
