import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { DeleteUserById } from "../../application/use-cases/DeleteUserById.ts";
import { GetUserByIdParamsDTO } from "./dtos/GetUserByIdParamsDTO.ts";

export function DeleteUserByIdEndpoint(
  deleteUserById: DeleteUserById
): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/users/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Deletes a user",
        description: "Allows deleting a user account",
        responses: {
          201: {
            description: "User deleted",
          },
        },
        tags: [ApiTag.USER],
      }),
      validator("param", GetUserByIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUserId = getAuthenticatedUserId(c);
        await deleteUserById.run(id, authenticatedUserId);
        return c.json({ message: "User deleted successfully" });
      },
    ],
  };
}
