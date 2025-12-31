import { describeRoute } from "hono-openapi";
import { resolver } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { GetAllDraftsByUserId } from "../../application/use-cases/GetAllDraftsByUserId.ts";
import { GetAllDraftsByIdResponseDTO } from "./dtos/GetAllDraftsByIdResponseDTO.ts";

export function GetAllDraftsByUserEndpoint(
  getAllDraftsByUserId: GetAllDraftsByUserId
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/drafts`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all drafts from a user",
        description:
          "Allows to get all drafts from a user. The user provides nothing.",
        responses: {
          200: {
            description: "Drafts found",
            content: {
              "application/json": {
                schema: resolver(GetAllDraftsByIdResponseDTO),
              },
            },
          },
        },
        tags: [ApiTag.DRAFT],
      }),
      async (c) => {
        const authenticatedUser = getAuthenticatedUserId(c);
        const drafts = await getAllDraftsByUserId.run(authenticatedUser);
        c.status(200);
        return c.json(drafts.map((draft) => draft.toPrimitives()));
      },
    ],
  };
}
