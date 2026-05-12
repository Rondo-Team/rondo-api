import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";

extendZodWithOpenApi(z);

export const GetAllCommentFavouritesByUserIdAndPostIdQueryParamsDTO = z
  .object({
    postId: z.string().uuid().openapi({ example: ONE_STEP_POST.id }),
  })
  .openapi({
    description: "Query params for searching liked comments",
  });
