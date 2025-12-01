import { ProposalId } from "@/proposal/domain/value-objects/ProposalId"
import { ActivityProposalHistoryEntrie } from "../ActivityProposalHistoryEntrie"
import { ProposalHistoryEntrieId } from "@/proposal-history-entrie/domain/value-objects/ProposalHistoryEntrieId"

export interface ActivityProposalHistoryEntrieRepository {
  create(activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrie): Promise<void>
  getAllByProposalId(proposalId: ProposalId): Promise<ActivityProposalHistoryEntrie[] | undefined>
  existsWithId(id: ProposalHistoryEntrieId): Promise<boolean>
}