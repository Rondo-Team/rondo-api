import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetUserById } from "../../application/use-cases/GetUserById.ts";
import { GetUserByIdParamsDTO } from "./dtos/GetUserByIdParamsDTO.ts";
import { GetUserByIdResponseDTO } from "./dtos/GetUserByIdResponseDTO.ts";

export function GetUserByIdEndpoint(getById: GetUserById): Endpoint {
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
      validator("param", GetUserByIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const user = await getById.run(id);
        // Set tokens in cookie
        return c.json(user);
      },
    ],
  };
}
