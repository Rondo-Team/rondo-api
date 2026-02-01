import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import { ChangeDraftPlay } from "../../application/use-cases/ChangeDraftPlay.ts";
import { ChangeDraftPlayRequestDTO } from "./dtos/ChangeDraftPlayRequestDTO.ts";
import { DraftIdParamsDTO } from "./dtos/DraftIdParamsDTO.ts";

export function ChangeDraftPlayEndpoint(
  changeDraftPlay: ChangeDraftPlay
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/drafts/:id/play`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a draft play",
        description:
          "Allows to update a draft play. The user provides an unique id by params and a new play in body.",
        responses: {
          200: {
            description: "Draft updated",
          },
        },
        tags: [ApiTag.DRAFT],
      }),
      validator("json", ChangeDraftPlayRequestDTO),
      validator("param", DraftIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const { newPlay } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);

        await changeDraftPlay.run(id, authenticatedUser, newPlay);
        c.status(200);
        return c.json({ message: "Play updated succesfully" });
      },
    ],
  };
}
