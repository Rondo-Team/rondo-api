import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";

extendZodWithOpenApi(z);
export const CommentIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: SAMPLE_PARENT_COMMENT.id }),
  })
  .openapi({
    description:
      "Data necessary to refer to a comment. Needs to be provided an id.",
  });
