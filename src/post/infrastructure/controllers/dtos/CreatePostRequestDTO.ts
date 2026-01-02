import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  POST_DESCRIPTION_CHAR_LOWER_LIMIT,
  POST_DESCRIPTION_CHAR_UPPER_LIMIT,
  POST_TITLE_CHAR_LOWER_LIMIT,
  POST_TITLE_CHAR_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";

extendZodWithOpenApi(z);
export const CreatePostRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: ONE_STEP_POST.id }),
    title: z
      .string()
      .min(POST_TITLE_CHAR_LOWER_LIMIT)
      .max(POST_TITLE_CHAR_UPPER_LIMIT)
      .openapi({ example: ONE_STEP_POST.title }),
    description: z
      .string()
      .min(POST_DESCRIPTION_CHAR_LOWER_LIMIT)
      .max(POST_DESCRIPTION_CHAR_UPPER_LIMIT)
      .openapi({ example: ONE_STEP_POST.description }),
    tags: z.array(z.string().openapi({ example: ONE_STEP_POST.tags[0] })),
    play: PlayZodSchema,
  })
  .openapi({
    description:
      "Data necesary to create a post. Needs to be provided an id, title, description, tags and play.",
  });
