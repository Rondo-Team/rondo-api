import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { ONE_STEP_POST_FAVOURITE } from "../../../../../shared/utils/domain/fixtures/postFavourites.ts";

extendZodWithOpenApi(z);
export const PostFavouriteIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: ONE_STEP_POST_FAVOURITE.id }),
  })
  .openapi({
    description:
      "Data necesary to refer to a post favourite. Needs to be provided an id.",
  });
