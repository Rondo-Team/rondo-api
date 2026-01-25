import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { UserIdParamsDTO } from "../../../user/infrastructure/controllers/dtos/UserIdParamsDTO.ts";
import type { GetAllProposalsByUserId } from "../../application/use-cases/GetAllProposalsByUserId.ts";

export function GetAllProposalsByUserIdEndpoint(
  getAllProposalsByUserId: GetAllProposalsByUserId,
): Endpoint {
  return {
    method: "get",
    path: `${config.app.baseUrl}/proposal/user/:id`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Gets all proposals for a user",
        description:
          "Allows to get all proposals for a user by their id. The user provides a unique id.",
        responses: {
          200: { description: "Proposals found" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", UserIdParamsDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const proposals = await getAllProposalsByUserId.run(id);
        c.status(200);
        return c.json(proposals.map((proposal) => proposal.toPrimitives()));
      },
    ],
  };
}
