import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import { AcceptProposal } from "../../application/use-cases/AcceptProposal.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function AcceptProposalEndpoint(
  acceptProposal: AcceptProposal,
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/proposal/:id/accept`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Accepts a proposal made to a post",
        description:
          "Allows to change a post play, with the proposal play information information. The user provides the proposal id through params.",
        responses: {
          200: { description: "Proposal accepted succesfully" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),

      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);

        await acceptProposal.run(id, authenticatedUser);
        c.status(200);

        return c.json({ message: "Proposal accepted succesfully" });
      },
    ],
  };
}
