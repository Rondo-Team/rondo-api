import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserId } from "@/user/domain/value-objects/UserId";
import { ProposalHistoryEntrieId } from "./value-objects/ProposalHistoryEntrieId";

export abstract class ProposalHistoryEntrie {
  id: ProposalHistoryEntrieId;
  proposalId: ProposalId;
  userId: UserId;
  createdAt: CreatedAt;
  constructor(
    id: ProposalHistoryEntrieId,
    proposalId: ProposalId,
    userId: UserId,
    createdAt: CreatedAt
  ) {
    this.id = id;
    this.proposalId = proposalId;
    this.userId = userId;
    this.createdAt = createdAt;
  }
}