import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { PostIdParamsDTO } from "../../../post/infrastructure/controllers/dtos/PostIdParamsDTO.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import type { GetAllProposalsByPostId } from "../../application/use-cases/GetAllProposalsByPostId.ts";

export function GetAllProposalsByPostIdEndpoint(
  getAllProposalsByPostId: GetAllProposalsByPostId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/proposal/post/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all proposals for a post",
        description:
          "Allows to get all proposals for a post by its id. The user provides an unique id.",
        responses: {
          200: { description: "Proposal found" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", PostIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const proposals = await getAllProposalsByPostId.run(id);
        c.status(200);
        return c.json(proposals.map((proposal) => proposal.toPrimitives()));
      },
    ],
  };
}
