import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT,
  PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT,
  PROPOSAL_TITLE_CHAR_LOWER_LIMIT,
  PROPOSAL_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { TWO_STEP_PROPOSAL } from "../../../../shared/utils/domain/fixtures/proposals.ts";

extendZodWithOpenApi(z);
export const ChangeProposalInformationRequestDTO = z
  .object({
    newTitle: z
      .string()
      .min(PROPOSAL_TITLE_CHAR_LOWER_LIMIT)
      .max(PROPOSAL_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEP_PROPOSAL.title }),
    newDescription: z
      .string()
      .min(PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEP_PROPOSAL.description }),
  })
  .openapi({
    description:
      "Data necesary to change a proposal information. Needs to be provided the new title and description.",
  });
