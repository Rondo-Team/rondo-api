import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";
import { MANOLO_LOPEZ } from "../../../../../shared/utils/domain/fixtures/users.ts";

extendZodWithOpenApi(z);

export const GetAllCommentFavouritesByUserIdAndPostIdQueryParamsDTO = z
  .object({
    postId: z.string().uuid().openapi({ example: ONE_STEP_POST.id }),
    userId: z.string().uuid().openapi({ example: MANOLO_LOPEZ.id }),
  })
  .openapi({
    description: "Query params for searching liked comments",
  });
