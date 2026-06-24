import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT,
  PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT,
  PROPOSAL_TITLE_CHAR_LOWER_LIMIT,
  PROPOSAL_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";
import { TWO_STEP_PROPOSAL } from "../../../../shared/utils/domain/fixtures/proposals.ts";

extendZodWithOpenApi(z);
export const UpdateProposalRequestDTO = z
  .object({
    play: PlayZodSchema.optional(),
    title: z
      .string()
      .min(PROPOSAL_TITLE_CHAR_LOWER_LIMIT)
      .max(PROPOSAL_TITLE_CHAR_UPPER_LIMIT)
      .optional()
      .openapi({ example: TWO_STEP_PROPOSAL.title }),
    description: z
      .string()
      .min(PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT)
      .optional()
      .openapi({ example: TWO_STEP_PROPOSAL.description }),
  })
  .openapi({
    description:
      "Data necesary to update a proposal. Optionally, provide the fields to update, or provide none to not update.",
  });
