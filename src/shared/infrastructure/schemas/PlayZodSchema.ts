import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { PlayElementType } from "../../domain/value-objects/PlayElementType.ts";
import { TWO_STEPS_DRAFT } from "../../utils/domain/fixtures/drafts.ts";
extendZodWithOpenApi(z);

export const PlayZodSchema = z.object({
  steps: z.array(
    z.object({
      elements: z.array(
        z.object({
          id: z
            .string()
            .uuid()
            .openapi({ example: TWO_STEPS_DRAFT.play.steps[0].elements[0].id }),
          x: z
            .number()
            .openapi({ example: TWO_STEPS_DRAFT.play.steps[0].elements[0].x }),
          y: z
            .number()
            .openapi({ example: TWO_STEPS_DRAFT.play.steps[0].elements[0].y }),
          elementType: z
            .enum(Object.values(PlayElementType) as [string, ...string[]])
            .openapi({
              example: TWO_STEPS_DRAFT.play.steps[0].elements[0].elementType,
            }),
        })
      ),
    })
  ),
});
