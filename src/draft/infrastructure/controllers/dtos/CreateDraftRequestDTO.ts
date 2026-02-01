import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT,
  DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT,
  DRAFT_TITLE_CHAR_LOWER_LIMIT,
  DRAFT_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";

extendZodWithOpenApi(z);
export const CreateDraftRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: TWO_STEPS_DRAFT.id }),
    title: z
      .string()
      .min(DRAFT_TITLE_CHAR_LOWER_LIMIT)
      .max(DRAFT_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEPS_DRAFT.title }),
    description: z
      .string()
      .min(DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEPS_DRAFT.description }),
    play: PlayZodSchema,
  })
  .openapi({
    description:
      "Data necesary to create a draft. Needs to be provided an id, title, description and play.",
  });
