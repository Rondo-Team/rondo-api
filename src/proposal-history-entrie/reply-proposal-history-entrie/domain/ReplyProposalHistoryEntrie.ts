import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrie } from "../../domain/ProposalHistoryEntrie.ts";
import { ProposalHistoryEntrieId } from "../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ReplyProposalHistoryEntrieMessage } from "./value-objects/ReplyProposalHistoryEntrieMessage.ts";

export class ReplyProposalHistoryEntrie extends ProposalHistoryEntrie {
  message: ReplyProposalHistoryEntrieMessage;
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt,
    message: ReplyProposalHistoryEntrieMessage
  ) {
    super(id, proposalId, userId, createdAt);
    this.message = message;
  }
}
