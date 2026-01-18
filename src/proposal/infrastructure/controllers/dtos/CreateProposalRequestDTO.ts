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
export const CreateProposalRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: TWO_STEP_PROPOSAL.id }),
    postId: z.string().uuid().openapi({ example: TWO_STEP_PROPOSAL.postId }),
    title: z
      .string()
      .min(PROPOSAL_TITLE_CHAR_LOWER_LIMIT)
      .max(PROPOSAL_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEP_PROPOSAL.title }),
    description: z
      .string()
      .min(PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEP_PROPOSAL.description }),
    play: PlayZodSchema,
  })
  .openapi({
    description:
      "Data necesary to create a post. Needs to be provided an id, title, description, tags and play.",
  });
