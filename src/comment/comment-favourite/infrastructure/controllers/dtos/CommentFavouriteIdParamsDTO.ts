import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { SAMPLE_COMMENT_FAVOURITE } from "../../../../../shared/utils/domain/fixtures/commentFavourite.ts";

extendZodWithOpenApi(z);
export const CommentFavouriteIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: SAMPLE_COMMENT_FAVOURITE.id }),
  })
  .openapi({
    description:
      "Data necesary to refer to a comment favourite. Needs to be provided an id.",
  });
