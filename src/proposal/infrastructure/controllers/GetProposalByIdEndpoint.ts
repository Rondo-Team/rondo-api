import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetProposalById } from "../../application/use-cases/GetProposalById.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function GetProposalByIdEndpoint(
  getProposalById: GetProposalById,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/proposal/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets a proposal information",
        description:
          "Allows to get a proposal information by its id. The user provides an unique id.",
        responses: {
          200: { description: "Proposal found" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const proposal = await getProposalById.run(id);
        c.status(200);
        return c.json(proposal);
      },
    ],
  };
}
