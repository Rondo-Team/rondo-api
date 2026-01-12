import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  POST_DESCRIPTION_CHAR_LOWER_LIMIT,
  POST_DESCRIPTION_CHAR_UPPER_LIMIT,
  POST_TITLE_CHAR_LOWER_LIMIT,
  POST_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { TWO_STEPS_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";

extendZodWithOpenApi(z);
export const ChangePostInformationRequestDTO = z
  .object({
    newTitle: z
      .string()
      .min(POST_TITLE_CHAR_LOWER_LIMIT)
      .max(POST_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEPS_POST.title }),
    newDescription: z
      .string()
      .min(POST_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(POST_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: TWO_STEPS_POST.description }),
  })
  .openapi({
    description:
      "Data necesary to change a post play. Needs to be provided the new play.",
  });
