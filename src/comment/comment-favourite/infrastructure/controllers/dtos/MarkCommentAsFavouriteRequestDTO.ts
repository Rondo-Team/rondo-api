import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../../shared/utils/domain/fixtures/commentFavourite.ts";

extendZodWithOpenApi(z);
export const MarkCommentAsFavouriteRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: SAMPLE_COMMENT_FAVOURITE.id }),
    commentId: z
      .string()
      .uuid()
      .openapi({ example: SAMPLE_COMMENT_FAVOURITE.commentId }),
  })
  .openapi({
    description:
      "Data necesary to mark a comment as favourite. Needs to be provided an id and a commentId.",
  });
