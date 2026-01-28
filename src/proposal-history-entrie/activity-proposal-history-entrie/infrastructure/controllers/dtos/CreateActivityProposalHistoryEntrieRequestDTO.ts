import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import { ACTIVITY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/activityHistoryEntrie.ts";

extendZodWithOpenApi(z);
export const CreateActivityProposalHistoryEntrieRequestDTO = z
  .object({
    id: z
      .string()
      .uuid()
      .openapi({ example: ACTIVITY_PROPOSAL_HISTORY_ENTRIE.id }),
    proposalId: z
      .string()
      .uuid()
      .openapi({ example: ACTIVITY_PROPOSAL_HISTORY_ENTRIE.proposalId }),
  })
  .openapi({
    description:
      "Data necesary to create a activity proposal history entrie. Needs to be provided an id and proposalId.",
  });
