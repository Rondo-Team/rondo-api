import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  COMMENT_MESSAGE_LOWER_LIMIT,
  COMMENT_MESSAGE_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { SAMPLE_PARENT_COMMENT } from "../../../../shared/utils/domain/fixtures/comments.ts";

extendZodWithOpenApi(z);
export const CreateCommentRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: SAMPLE_PARENT_COMMENT.id }),
    postId: z
      .string()
      .uuid()
      .openapi({ example: SAMPLE_PARENT_COMMENT.postId }),
    message: z
      .string()
      .min(COMMENT_MESSAGE_LOWER_LIMIT)
      .max(COMMENT_MESSAGE_UPPER_LIMIT)
      .openapi({ example: SAMPLE_PARENT_COMMENT.message }),
  })
  .openapi({
    description:
      "Data necesary to create a comment. Needs to be provided an id a userId, postId, and message.",
  });
