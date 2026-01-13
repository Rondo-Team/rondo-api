import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { ONE_STEP_POST_FAVOURITE } from "../../../../../shared/utils/domain/fixtures/postFavourites.ts";
import { ONE_STEP_POST } from "../../../../../shared/utils/domain/fixtures/posts.ts";

extendZodWithOpenApi(z);
export const MarkPostAsFavouriteRequestDTO = z
  .object({
    id: z.string().uuid().openapi({ example: ONE_STEP_POST_FAVOURITE.id }),
    postId: z.string().uuid().openapi({ example: ONE_STEP_POST.id }),
  })
  .openapi({
    description:
      "Data necesary to mark a post as favourite. Needs to be provided an id and a postId.",
  });
