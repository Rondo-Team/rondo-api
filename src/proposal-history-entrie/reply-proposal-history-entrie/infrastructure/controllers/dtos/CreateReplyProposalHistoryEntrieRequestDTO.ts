import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT,
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT,
} from "../../../../../config/domain/Consts.ts";
import { REPLY_PROPOSAL_HISTORY_ENTRIE } from "../../../../../shared/utils/domain/fixtures/replyHistoryEntrie.ts";

extendZodWithOpenApi(z);
export const CreateReplyProposalHistoryEntrieRequestDTO = z
  .object({
    id: z
      .string()
      .uuid()
      .openapi({ example: REPLY_PROPOSAL_HISTORY_ENTRIE.id }),
    proposalId: z
      .string()
      .uuid()
      .openapi({ example: REPLY_PROPOSAL_HISTORY_ENTRIE.proposalId }),
    message: z
      .string()
      .min(REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT)
      .max(REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT),
  })
  .openapi({
    description:
      "Data necesary to create a reply proposal history entrie. Needs to be provided an id, a proposalId and a message.",
  });
