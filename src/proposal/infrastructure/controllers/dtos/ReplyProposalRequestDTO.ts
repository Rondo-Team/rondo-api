import z from "zod";
import { extendZodWithOpenApi } from "zod-openapi";
import {
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT,
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { REPLY_PROPOSAL_HISTORY_ENTRIE } from "../../../../shared/utils/domain/fixtures/replyHistoryEntrie.ts";

extendZodWithOpenApi(z);
export const ReplyProposalRequestDTO = z
  .object({
    message: z
      .string()
      .min(REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT)
      .max(REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT)
      .openapi({ example: REPLY_PROPOSAL_HISTORY_ENTRIE.message }),
  })
  .openapi({
    description:
      "Data necesary to reply to a proposal. Needs to be provided a message.",
  });
