import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";

import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import type { CreateActivityProposalHistoryEntrie } from "../../aplication/use-cases/CreateActivityProposalHistoryEntrie.ts";
import { CreateActivityProposalHistoryEntrieRequestDTO } from "./dtos/CreateActivityProposalHistoryEntrieRequestDTO.ts";

export function CreateActivityProposalHistoryEntrieEndpoint(
  createActivityProposalHistoryEntrie: CreateActivityProposalHistoryEntrie,
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/activity-proposal-history-entrie`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a new activity proposal history entrie",
        description:
          "Allows to create a new activity proposal history entrie. The user provides an unique id, the postId in which is proposing, title, description, and play.",
        responses: {
          201: {
            description: "Activity proposal history entrie created succesfully",
          },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("json", CreateActivityProposalHistoryEntrieRequestDTO),
      async (c) => {
        const { id, proposalId } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await createActivityProposalHistoryEntrie.run(
          id,
          proposalId,
          authenticatedUser,
          new Date(),
        );
        c.status(201);
        return c.json({
          message: "Activity proposal history entrie created succesfully",
        });
      },
    ],
  };
}
