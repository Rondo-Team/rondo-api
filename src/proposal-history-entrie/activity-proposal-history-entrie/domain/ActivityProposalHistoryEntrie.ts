import { ProposalHistoryEntrie } from "@/proposal-history-entrie/domain/ProposalHistoryEntrie";
import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserId } from "@/user/domain/value-objects/UserId";

export class ActivityProposalHistoryEntrie extends ProposalHistoryEntrie {
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt,
  ) {
    super(id, proposalId, userId, createdAt)
  }
}