import { ProposalRepository } from "../../../../proposal/domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../../../proposal/domain/services/ProposalFinder.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository.ts";

export class GetAllByProposalId {
  private readonly proposalFinder: ProposalFinder;
  constructor(
    private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository,
    proposalRepository: ProposalRepository
  ) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string) {
    const proposalId = new ProposalId(id);
    // Check proposal existance
    await this.proposalFinder.findById(proposalId);

    return this.replyProposalHistoryEntrieRepository.getAllByProposalId(
      proposalId
    );
  }
}
