import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { ONE_STEP_POST } from "../../../../shared/utils/domain/fixtures/posts.ts";

extendZodWithOpenApi(z);
export const PostIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: ONE_STEP_POST.id }),
  })
  .openapi({
    description:
      "Data necesary to refer to a post. Needs to be provided an id.",
  });
