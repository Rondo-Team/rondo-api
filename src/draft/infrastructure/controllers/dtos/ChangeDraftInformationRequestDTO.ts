import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT,
  DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT,
  DRAFT_TITLE_CHAR_LOWER_LIMIT,
  DRAFT_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";

extendZodWithOpenApi(z);
export const ChangeDraftInformationRequestDTO = z
  .object({
    newTitle: z
      .string()
      .min(DRAFT_TITLE_CHAR_LOWER_LIMIT)
      .max(DRAFT_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEPS_DRAFT.title }),
    newDescription: z
      .string()
      .min(DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEPS_DRAFT.description }),
  })
  .openapi({
    description:
      "Data necesary to update a draft information. Needs to be provided a new title and new description.",
  });
