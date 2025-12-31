import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { SAMPLE_DRAFT } from "../../../../shared/utils/domain/fixtures/drafts.ts";

extendZodWithOpenApi(z);
export const DraftIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: SAMPLE_DRAFT.id }),
  })
  .openapi({
    description:
      "Data necesary to specify a draft. Needs to be provided an id.",
  });
