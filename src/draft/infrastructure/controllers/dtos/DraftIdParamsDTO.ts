import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { TWO_STEPS_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";

extendZodWithOpenApi(z);
export const DraftIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: TWO_STEPS_DRAFT.id }),
  })
  .openapi({
    description:
      "Data necesary to specify a draft. Needs to be provided an id.",
  });
