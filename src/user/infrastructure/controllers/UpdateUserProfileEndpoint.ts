import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UpdateUserProfile } from "../../application/use-cases/UpdateUserProfile.ts";
import { UpdateUserProfileRequestDTO } from "./dtos/UpdateUserProfileRequestDTO.ts";

export function UpdateUserProfileEndpoint(
  updateUserProfile: UpdateUserProfile
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/users/me/profile`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a User profile",
        description:
          "Allows to update a User profile. The user provides an unique id, name and profilePicture.",
        responses: {
          201: { description: "User updated succesfully" },
        },
        tags: [ApiTag.USER],
      }),
      validator("json", UpdateUserProfileRequestDTO),
      async (c) => {
        const { name, profilePicture } = c.req.valid("json");
        const userId = getAuthenticatedUserId(c);

        await updateUserProfile.run(userId, name, profilePicture);
        c.status(200);
        return c.json({ message: "User updated succesfully" });
      },
    ],
  };
}
