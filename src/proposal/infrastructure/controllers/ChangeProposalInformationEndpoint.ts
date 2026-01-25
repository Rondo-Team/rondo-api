import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { config } from "../../../config/infrastructure/config.ts";
import { ApiTag } from "../../../shared/controllers/infrastructure/schemas/ApiTag.ts";
import type { Endpoint } from "../../../shared/controllers/infrastructure/types/Endpoint.ts";
import { getAuthenticatedUserId } from "../../../shared/controllers/infrastructure/utils/auth.ts";
import type { ChangeProposalInformation } from "../../application/use-cases/ChangeProposalInformation.ts";
import { ChangeProposalInformationRequestDTO } from "./dtos/ChangeProposalInformationRequestDTO.ts";
import { ProposalIdParamsDTO } from "./dtos/ProposalIdParamsDTO.ts";

export function ChangeProposalInformationEndpoint(
  changeProposalInformation: ChangeProposalInformation,
): Endpoint {
  return {
    method: "patch",
    path: `${config.app.baseUrl}/proposal/:id/info`,
    secured: true,
    handlers: [
      describeRoute({
        summary: "Changes a proposal information",
        description:
          "Allows to change a proposal information. The user provides the proposal id through params and the new title and description through body.",
        responses: {
          200: { description: "Proposal updated succesfully" },
        },
        tags: [ApiTag.PROPOSAL],
      }),
      validator("param", ProposalIdParamsDTO),
      validator("json", ChangeProposalInformationRequestDTO),

      async (c) => {
        const { id } = c.req.valid("param");
        const authenticatedUser = getAuthenticatedUserId(c);
        const { newTitle, newDescription } = c.req.valid("json");

        await changeProposalInformation.run(
          id,
          authenticatedUser,
          newTitle,
          newDescription,
        );
        c.status(200);

        return c.json({ message: "Proposal updated succesfully" });
      },
    ],
  };
}
