import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";

import { config } from "../../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../../shared/controllers/infrastructure/utils/auth.ts";
import type { CreateReplyProposalHistoryEntrie } from "../../aplication/use-cases/CreateReplyProposalHistoryEntrie.ts";
import { CreateReplyProposalHistoryEntrieRequestDTO } from "./dtos/CreateReplyProposalHistoryEntrieRequestDTO.ts";

export function CreateReplyProposalHistoryEntrieEndpoint(
  createReplyProposalHistoryEntrie: CreateReplyProposalHistoryEntrie,
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/reply-proposal-history-entrie`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a new reply proposal history entrie",
        description:
          "Allows to create a new reply proposal history entrie. The user provides an unique id, the postId in which is proposing, title, description, and play.",
        responses: {
          201: {
            description: "Reply proposal history entrie created succesfully",
          },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("json", CreateReplyProposalHistoryEntrieRequestDTO),
      async (c) => {
        const { id, proposalId, message } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await createReplyProposalHistoryEntrie.run(
          id,
          proposalId,
          authenticatedUser,
          new Date(),
          message,
        );
        c.status(201);
        return c.json({
          message: "Reply proposal history entrie created succesfully",
        });
      },
    ],
  };
}
