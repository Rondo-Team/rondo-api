import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UpdateUserProfile } from "../../application/use-cases/UpdateUserProfile.ts";
import { UpdateUserProfileRequestDTO } from "./dtos/UpdateUserProfileRequestDTO.ts";
import { UserIdParamsDTO } from "./dtos/UserIdParamsDTO.ts";

export function UpdateUserProfileEndpoint(
  updateUserProfile: UpdateUserProfile
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/users/:id`,
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
      validator("param", UserIdParamsDTO),
      validator("json", UpdateUserProfileRequestDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const { name, profilePicture } = c.req.valid("json");
        const authenticatedUserId = getAuthenticatedUserId(c);

        await updateUserProfile.run(
          id,
          authenticatedUserId,
          name,
          profilePicture
        );
        c.status(200);
        return c.json({ message: "User created succesfully" });
      },
    ],
  };
}
