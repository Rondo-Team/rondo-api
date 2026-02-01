import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../../config/infrastructure/config.ts";
import { ProposalIdParamsDTO } from "../../../../proposal/infrastructure/controllers/dtos/ProposalIdParamsDTO.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetAllActivityProposalHistoryEntriesByProposalId } from "../../aplication/use-cases/GetAllActivityProposalHistoryEntriesByProposalId.ts";

export function GetAllActivityProposalHistoryEntriesByProposalIdEndpoint(
  getAllActivityProposalHistoryEntriesByProposalId: GetAllActivityProposalHistoryEntriesByProposalId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/activity-proposal-history-entrie/proposal/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all activity proposal history entries by proposal id",
        description:
          "Allows to get all activity proposal history entries by proposal id.",
        responses: {
          200: {
            description:
              "Activity proposal history entries retrieved successfully",
          },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const activityProposalHistoryEntries =
          await getAllActivityProposalHistoryEntriesByProposalId.run(id);
        c.status(200);
        return c.json(
          activityProposalHistoryEntries.map((entry) => entry.toPrimitives()),
        );
      },
    ],
  };
}
