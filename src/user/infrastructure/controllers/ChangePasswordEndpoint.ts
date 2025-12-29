import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ChangePassword } from "../../application/use-cases/ChangePassword.ts";
import { ChangePasswordRequestDTO } from "./dtos/ChangePasswordRequestDTO.ts";

export function ChangePasswordEndpoint(
  changePassword: ChangePassword
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/users/me/password`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a User password",
        description:
          "Allows to update a user's password. The user provides the current password and the new one.",
        responses: {
          200: { description: "User updated succesfully" },
        },
        tags: [ApiTag.USER],
      }),
      validator("json", ChangePasswordRequestDTO),
      async (c) => {
        const { password, newPassword } = c.req.valid("json");
        const userId = getAuthenticatedUserId(c);

        await changePassword.run(userId, password, newPassword);

        c.status(200);
        return c.json({ message: "User updated succesfully" });
      },
    ],
  };
}
