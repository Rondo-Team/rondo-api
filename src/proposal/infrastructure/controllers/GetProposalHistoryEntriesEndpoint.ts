import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetProposalHistoryEntries } from "../../application/use-cases/GetProposalHistoryEntries.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function GetProposalHistoryEntriesEndpoint(
  getProposalHistoryEntries: GetProposalHistoryEntries,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/proposal/:id/history`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all history entries for a proposal",
        description:
          "Allows to get all history entries for a proposal. The user provides a unique id.",
        responses: {
          200: { description: "Proposal history entries found" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const historyEntries = await getProposalHistoryEntries.run(id);
        c.status(200);
        return c.json(historyEntries);
      },
    ],
  };
}
