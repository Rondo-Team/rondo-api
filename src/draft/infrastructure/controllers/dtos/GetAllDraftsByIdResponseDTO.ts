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
import { MANOLO_LOPEZ } from "../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);
export const GetAllDraftsByIdResponseDTO = z
  .array(
    z.object({
      id: z.string().uuid().openapi({ example: TWO_STEPS_DRAFT.id }),
      userId: z.string().uuid().openapi({ example: MANOLO_LOPEZ.id }),
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
      createdAt: z
        .date()
        .max(new Date())
        .openapi({ example: TWO_STEPS_DRAFT.createdAt }),
      play: PlayZodSchema,
    })
  )
  .openapi({
    description: "Data returned for draft information",
  });
