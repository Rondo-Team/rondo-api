import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { ProposalHistoryEntrieId } from "../../../domain/value-objects/ProposalHistoryEntrieId.ts";
import { ActivityProposalHistoryEntrie } from "../ActivityProposalHistoryEntrie.ts";

export interface ActivityProposalHistoryEntrieRepository {
  create(
    activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrie
  ): Promise<void>;
  getAllByProposalId(
    proposalId: ProposalId
  ): Promise<ActivityProposalHistoryEntrie[] | undefined>;
  existsWithId(id: ProposalHistoryEntrieId): Promise<boolean>;
}
