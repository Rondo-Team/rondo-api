import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT,
  DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT,
  DRAFT_TITLE_CHAR_LOWER_LIMIT,
  DRAFT_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";
import {
  ONE_STEP_DRAFT,
  TWO_STEPS_DRAFT,
} from "../../../../shared/utils/domain/fixtures/drafts.ts";

extendZodWithOpenApi(z);
export const UpdateDraftRequestDTO = z
  .object({
    play: PlayZodSchema.optional(),
    title: z
      .string()
      .min(DRAFT_TITLE_CHAR_LOWER_LIMIT)
      .max(DRAFT_TITLE_CHAR_UPPER_LIMIT)
      .optional()
      .openapi({ example: TWO_STEPS_DRAFT.title }),
    description: z
      .string()
      .min(DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT)
      .optional()
      .openapi({ example: ONE_STEP_DRAFT.description }),
  })
  .openapi({
    description:
      "Data necesary to update a draft. Optionally, provide the fields to update, or provide none to not update.",
  });
