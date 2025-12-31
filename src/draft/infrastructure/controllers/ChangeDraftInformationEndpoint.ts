import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ChangeDraftInformation } from "../../application/use-cases/ChangeDraftInformation.ts";
import { ChangeDraftInformationRequestDTO } from "./dtos/ChangeDraftInformationRequestDTO.ts";
import { DraftIdParamsDTO } from "./dtos/DraftIdParamsDTO.ts";

export function ChangeDraftInformationEndpoint(
  changeDraftInformation: ChangeDraftInformation
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/drafts/:id/info`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a draft information",
        description:
          "Allows to update a draft information. The user provides an unique id by params and a new title and description in body.",
        responses: {
          200: {
            description: "Draft updated",
          },
        },
        tags: [ApiTag.DRAFT],
      }),
      validator("json", ChangeDraftInformationRequestDTO),
      validator("param", DraftIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const { newTitle, newDescription } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);

        await changeDraftInformation.run(
          id,
          authenticatedUser,
          newTitle,
          newDescription
        );
        c.status(200);
        return c.json({ message: "Draft information updated succesfully" });
      },
    ],
  };
}
