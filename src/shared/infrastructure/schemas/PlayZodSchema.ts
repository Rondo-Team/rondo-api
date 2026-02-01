import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { PlayElementType } from "../../domain/value-objects/PlayElementType.ts";
import { ONE_STEP_PLAY } from "../../utils/domain/fixtures/plays.ts";
extendZodWithOpenApi(z);

export const PlayZodSchema = z.object({
  steps: z.array(
    z.object({
      elements: z.array(
        z.object({
          id: z
            .string()
            .uuid()
            .openapi({ example: ONE_STEP_PLAY.steps[0].elements[0].id }),
          x: z
            .number()
            .openapi({ example: ONE_STEP_PLAY.steps[0].elements[0].x }),
          y: z
            .number()
            .openapi({ example: ONE_STEP_PLAY.steps[0].elements[0].y }),
          elementType: z
            .enum(Object.values(PlayElementType) as [string, ...string[]])
            .openapi({
              example: ONE_STEP_PLAY.steps[0].elements[0].elementType,
            }),
        })
      ),
    })
  ),
});
