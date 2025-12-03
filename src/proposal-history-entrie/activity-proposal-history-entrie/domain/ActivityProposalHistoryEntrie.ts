import { ProposalId } from "../../../proposal/domain/value-objects/ProposalId.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalHistoryEntrie } from "../../domain/ProposalHistoryEntrie.ts";
import { ProposalHistoryEntrieId } from "../../domain/value-objects/ProposalHistoryEntrieId.ts";

export class ActivityProposalHistoryEntrie extends ProposalHistoryEntrie {
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt
  ) {
    super(id, proposalId, userId, createdAt);
  }
}
