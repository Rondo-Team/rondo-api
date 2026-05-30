import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UpdateDraft } from "../../application/use-cases/UpdateDraft.ts";
import { DraftIdParamsDTO } from "./dtos/DraftIdParamsDTO.ts";
import { UpdateDraftRequestDTO } from "./dtos/UpdateDraftRequestDTO.ts";

export function UpdateDraftEndpoint(updateDraft: UpdateDraft): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/drafts/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a draft",
        description:
          "Allows to update a draft. The user provides the draft id through params and new title, description or play through body.",
        responses: {
          200: { description: "Draft updated" },
        },
        tags: [ApiTag.DRAFT],
      }),
      validator("param", DraftIdParamsDTO),
      validator("json", UpdateDraftRequestDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const { play, title, description } = c.req.valid("json");

        await updateDraft.run(id, authenticatedUser, play, title, description);
        c.status(200);

        return c.json({ message: "Draft updated succesfully" });
      },
    ],
  };
}
