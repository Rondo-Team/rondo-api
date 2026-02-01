import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ProposalIdParamsDTO } from "../../../../proposal/infrastructure/controllers/dtos/ProposalIdParamsDTO.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetAllReplyProposalHistoryEntriesByProposalId } from "../../aplication/use-cases/GetAllReplyProposalHistoryEntrieByProposalId.ts";

export function GetAllReplyProposalHistoryEntriesByProposalIdEndpoint(
  getAllReplyProposalHistoryEntriesByProposalId: GetAllReplyProposalHistoryEntriesByProposalId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/reply-proposal-history-entrie/proposal/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all reply proposal history entries by proposal id",
        description:
          "Allows to get all reply proposal history entries by proposal id.",
        responses: {
          200: {
            description:
              "Reply proposal history entries retrieved successfully",
          },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const replyProposalHistoryEntries =
          await getAllReplyProposalHistoryEntriesByProposalId.run(id);
        c.status(200);
        return c.json(
          replyProposalHistoryEntries.map((entry) => entry.toPrimitives()),
        );
      },
    ],
  };
}
