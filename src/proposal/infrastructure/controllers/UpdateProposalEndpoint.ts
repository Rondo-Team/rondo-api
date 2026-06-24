import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { UpdateProposal } from "../../application/use-cases/UpdateProposal.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";
import { UpdateProposalRequestDTO } from "./dtos/UpdateProposalRequestDTO.ts";

export function UpdateProposalEndpoint(
  updateProposal: UpdateProposal,
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/proposal/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Updates a proposal",
        description:
          "Allows to update a proposal. The user provides the proposal id through params and new title, description or play through body.",
        responses: {
          200: { description: "Proposal updated" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      validator("json", UpdateProposalRequestDTO),

      async (c) => {
        const { id } = c.req.valid("param");
        const { title, description, play } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);

        await updateProposal.run(
          id,
          authenticatedUser,
          title,
          description,
          play,
        );
        c.status(200);

        return c.json({ message: "Proposal updated succesfully" });
      },
    ],
  };
}
