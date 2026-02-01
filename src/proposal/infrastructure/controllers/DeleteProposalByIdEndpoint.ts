import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { DeleteProposalById } from "../../application/use-cases/DeleteProposalById.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function DeleteProposalByIdEndpoint(
  deleteProposalById: DeleteProposalById,
): Endpoint {
  return {
    method: "delete",
    path: `${config.app.baseUrl}/proposal/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Deletes a proposal by id",
        description:
          "Allows to delete a proposal by its unique id. The user must be authenticated and authorized to delete the proposal.",
        responses: {
          200: { description: "Proposal deleted successfully" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        await deleteProposalById.run(id, authenticatedUser);
        c.status(200);
        return c.json({ message: "Proposal deleted successfully" });
      },
    ],
  };
}
