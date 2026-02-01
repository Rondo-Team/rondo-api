import { describeRoute } from "hono-openapi";
import { resolver, validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { GetDraftById } from "../../application/use-cases/GetDraftById.ts";
import { DraftIdParamsDTO } from "./dtos/DraftIdParamsDTO.ts";
import { GetDraftByIdResponseDTO } from "./dtos/GetDraftByIdResponseDTO.ts";

export function GetDraftByIdEndpoint(getDraftById: GetDraftById): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/drafts/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets a draft information",
        description:
          "Allows to get a draft information. The user provides an unique id.",
        responses: {
          201: {
            description: "Draft found",
            content: {
              "application/json": {
                schema: resolver(GetDraftByIdResponseDTO),
              },
            },
          },
        },
        tags: [ApiTag.DRAFT],
      }),
      validator("param", DraftIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const draft = await getDraftById.run(id, authenticatedUser);
        c.status(200);
        return c.json(draft.toPrimitives());
      },
    ],
  };
}
