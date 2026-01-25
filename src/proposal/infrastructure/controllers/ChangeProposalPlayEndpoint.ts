import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ChangeProposalPlay } from "../../application/use-cases/ChangeProposalPlay.ts";
import { ChangeProposalPlayRequestDTO } from "./dtos/ChangeProposalPlayRequestDTO.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function ChangeProposalPlayEndpoint(
  changeProposalPlay: ChangeProposalPlay,
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/proposal/:id/play`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Changes a proposal play",
        description:
          "Allows to change a proposal play. The user provides the proposal id through params and the new play through body.",
        responses: {
          200: { description: "Play changed" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      validator("json", ChangeProposalPlayRequestDTO),
      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const { newPlay } = c.req.valid("json");

        await changeProposalPlay.run(id, newPlay, authenticatedUser);
        c.status(200);

        return c.json({ message: "Play changed succesfully" });
      },
    ],
  };
}
