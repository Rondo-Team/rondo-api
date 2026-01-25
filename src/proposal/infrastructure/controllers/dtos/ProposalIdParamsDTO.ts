import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { TWO_STEP_PROPOSAL } from "../../../../shared/utils/domain/fixtures/proposals.ts";

extendZodWithOpenApi(z);
export const ProposalIdParamsDTO = z
  .object({
    id: z.string().uuid().openapi({ example: TWO_STEP_PROPOSAL.id }),
  })
  .openapi({
    description:
      "Data necesary to refer to a proposal. Needs to be provided an id.",
  });
