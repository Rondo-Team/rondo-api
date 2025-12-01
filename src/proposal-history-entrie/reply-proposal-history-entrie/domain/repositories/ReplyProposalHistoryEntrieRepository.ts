import { ActivityProposalHistoryEntrie } from "@/proposal-history-entrie/activity-proposal-history-entrie/domain/ActivityProposalHistoryEntrie"
import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId"
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId"

export interface ReplyProposalHistoryEntrieRepository {
  create(activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrie): Promise<void>
  getAllByProposalId(proposalId: ProposalId): Promise<ActivityProposalHistoryEntrie[] | undefined>
  DeleteById(id: ProposalHistoryEntrieId): Promise<void>
  existsWithId(id: ProposalHistoryEntrieId): Promise<boolean>

}