import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ChangeUsername } from "../../application/use-cases/ChangeUsername.ts";
import { ChangeUsernameRequestDTO } from "./dtos/ChangeUsernameRequestDTO.ts";

export function ChangeUsernameEndpoint(
  changeUsername: ChangeUsername
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/users/me/username`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a User username",
        description:
          "Allows to update a user's username. The user provides the new username.",
        responses: {
          201: { description: "User updated succesfully" },
        },
        tags: [ApiTag.USER],
      }),
      validator("json", ChangeUsernameRequestDTO),
      async (c) => {
        const { newUsername } = c.req.valid("json");
        const userId = getAuthenticatedUserId(c);

        await changeUsername.run(userId, newUsername);
        c.status(200);
        return c.json({ message: "User updated succesfully" });
      },
    ],
  };
}
