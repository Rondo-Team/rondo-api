import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { PlayZodSchema } from "../../../../shared/infrastructure/schemas/PlayZodSchema.ts";

extendZodWithOpenApi(z);
export const ChangeProposalPlayRequestDTO = z
  .object({
    newPlay: PlayZodSchema,
  })
  .openapi({
    description:
      "Data necesary to change a proposal play. Needs to be provided the new play.",
  });
