import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT,
  DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT,
  DRAFT_TITLE_CHAR_LOWER_LIMIT,
  DRAFT_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";
import { SAMPLE_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";

extendZodWithOpenApi(z);
export const CreateDraftRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: SAMPLE_DRAFT.id }),
    title: z
      .string()
      .min(DRAFT_TITLE_CHAR_LOWER_LIMIT)
      .max(DRAFT_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: SAMPLE_DRAFT.title }),
    description: z
      .string()
      .min(DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: SAMPLE_DRAFT.description }),
    play: PlayZodSchema,
  })
  .openapi({
    description:
      "Data necesary to update an user password. Needs to be provided the current and the new password.",
  });
