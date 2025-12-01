import { ProposalHistoryEntrie } from "@/proposal-history-entrie/domain/ProposalHistoryEntrie";
import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserId } from "@/user/domain/value-objects/UserId";
import { ReplyProposalHistoryEntrieMessage } from "./value-objects/ReplyProposalHistoryEntrieMessage";

export class ReplyProposalHistoryEntrie extends ProposalHistoryEntrie {
  message: ReplyProposalHistoryEntrieMessage;
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt,
    message: ReplyProposalHistoryEntrieMessage
  ) {
    super(id, proposalId, userId, createdAt)
    this.message = message
  }
}