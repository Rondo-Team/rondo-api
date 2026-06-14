import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { DeclineProposal } from "../../application/use-cases/DeclineProposal.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function DeclineProposalEndpoint(
  declineProposal: DeclineProposal,
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/proposal/:id/decline`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Declines a proposal made to a post",
        description:
          "Allows to decline a proposal made to a post. The user provides the proposal id through params.",
        responses: {
          200: { description: "Proposal declined succesfully" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),

      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);

        await declineProposal.run(id, authenticatedUser);
        c.status(200);

        return c.json({ message: "Proposal accepted succesfully" });
      },
    ],
  };
}
