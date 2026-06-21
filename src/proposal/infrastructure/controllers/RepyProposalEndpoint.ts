import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ReplyProposal } from "../../application/use-cases/ReplyProposal.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";
import { ReplyProposalRequestDTO } from "./dtos/ReplyProposalRequestDTO.ts";

export function ReplyProposalEndpoint(replyProposal: ReplyProposal): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/proposal/:id/reply`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Replies in proposal context",
        description:
          "Allows to reply to a proposal in order to give feedback between original post creator and proposal creator.",
        responses: {
          200: { description: "Proposal replied succesfully" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      validator("json", ReplyProposalRequestDTO),

      async (c) => {
        const { id } = c.req.valid("param");
        const { message } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);

        await replyProposal.run(id, authenticatedUser, message);
        c.status(200);

        return c.json({ message: "Proposal replied succesfully" });
      },
    ],
  };
}
