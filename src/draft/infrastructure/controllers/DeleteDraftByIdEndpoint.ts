import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { DeleteDraftById } from "../../application/use-cases/DeleteDraftById.ts";
import { DraftIdParamsDTO } from "./dtos/DraftIdParamsDTO.ts";

export function DeleteDraftByIdEndpoint(
  deleteDraftById: DeleteDraftById
): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/drafts/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Deletes a draft by id",
        description:
          "Allows to delete a draft. The user provides an unique id.",
        responses: {
          200: {
            description: "Draft deleted",
          },
        },
        tags: [ApiTag.DRAFT],
      }),
      validator("param", DraftIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        await deleteDraftById.run(id, authenticatedUser);
        c.status(200);
        return c.json({ message: "draft deleted succesfully " });
      },
    ],
  };
}
