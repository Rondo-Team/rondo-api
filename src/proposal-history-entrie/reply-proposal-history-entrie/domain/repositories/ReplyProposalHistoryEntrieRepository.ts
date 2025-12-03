import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { ActivityProposalHistoryEntrie } from "../../../activity-proposal-history-entrie/domain/ActivityProposalHistoryEntrie.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";

export interface ReplyProposalHistoryEntrieRepository {
  create(
    activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrie
  ): Promise<void>;
  getAllByProposalId(
    proposalId: ProposalId
  ): Promise<ActivityProposalHistoryEntrie[] | undefined>;
  deleteById(id: ProposalHistoryEntrieId): Promise<void>;
  existsWithId(id: ProposalHistoryEntrieId): Promise<boolean>;
}
