import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository"
import { ProposalFinder } from "@/proposal/domain/services/ProposalFinder"
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId"
import { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository"

export class GetAllByProposalId {
  private readonly proposalFinder: ProposalFinder
  constructor(
    private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository,
    proposalRepository: ProposalRepository
  ) {
    this.proposalFinder = new ProposalFinder(proposalRepository)
  }

  async run(
    id: string,
  ) {
    const proposalId = new ProposalId(id)
    // Check proposal existance
    await this.proposalFinder.findById(proposalId)

    return this.replyProposalHistoryEntrieRepository.getAllByProposalId(proposalId)
  }
}