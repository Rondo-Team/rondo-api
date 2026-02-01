import type { ProposalRepository } from "../../../../proposal/domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../../../proposal/domain/services/ProposalFinder.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import type { ReplyProposalHistoryEntrieRepository } from "../../domain/repositories/ReplyProposalHistoryEntrieRepository.ts";

export class GetAllReplyProposalHistoryEntriesByProposalId {
  private replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository;
  private readonly proposalFinder: ProposalFinder;
  constructor(
    replyProposalHistoryEntrieRepository: ReplyProposalHistoryEntrieRepository,
    proposalRepository: ProposalRepository,
  ) {
    this.replyProposalHistoryEntrieRepository =
      replyProposalHistoryEntrieRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string) {
    const proposalId = new ProposalId(id);
    // Check proposal existance
    await this.proposalFinder.findById(proposalId);

    return this.replyProposalHistoryEntrieRepository.getAllByProposalId(
      proposalId,
    );
  }
}
