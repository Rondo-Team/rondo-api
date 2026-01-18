import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { CreateProposal } from "../../application/use-cases/CreateProposal.ts";
import { CreateProposalRequestDTO } from "./dtos/CreateProposalRequestDTO.ts";

export function CreateProposalEndpoint(
  createProposal: CreateProposal
): Endpoint {
  return {
    method: "post",
    path: `${config.app.baseUrl}/proposal`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Creates a new proposal",
        description:
          "Allows to create a new proposal. The user provides an unique id, the postId in which is proposing, title, description, and play.",
        responses: {
          201: { description: "Proposal created succesfully" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("json", CreateProposalRequestDTO),
      async (c) => {
        const { id, postId, title, description, play } = c.req.valid("json");
        const authenticatedUser = getAuthenticatedUserId(c);
        await createProposal.run(
          id,
          authenticatedUser,
          postId,
          title,
          description,
          new Date(),
          play
        );
        c.status(201);
        return c.json({ message: "Proposal created succesfully" });
      },
    ],
  };
}
