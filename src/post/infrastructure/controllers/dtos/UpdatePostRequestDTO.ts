import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  POST_DESCRIPTION_CHAR_LOWER_LIMIT,
  POST_DESCRIPTION_CHAR_UPPER_LIMIT,
  POST_TITLE_CHAR_LOWER_LIMIT,
  POST_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";
import {
  ONE_STEP_POST,
  TWO_STEPS_POST,
} from "../../../../shared/utils/domain/fixtures/posts.ts";

extendZodWithOpenApi(z);
export const UpdatePostRequestDTO = z
  .object({
    play: PlayZodSchema.optional(),
    title: z
      .string()
      .min(POST_TITLE_CHAR_LOWER_LIMIT)
      .max(POST_TITLE_CHAR_UPPER_LIMIT)
      .optional()
      .openapi({ example: TWO_STEPS_POST.title }),
    description: z
      .string()
      .min(POST_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(POST_DESCRIPTION_CHAR_UPPER_LIMIT)
      .optional()
      .openapi({ example: TWO_STEPS_POST.description }),
    tags: z.array(
      z.string().openapi({ example: ONE_STEP_POST.tags[0] }),
    ).optional(),
  })
  .openapi({
    description:
      "Data necesary to update a post. Optionally, provide the fields to update, or provide none to not update.",
  });
