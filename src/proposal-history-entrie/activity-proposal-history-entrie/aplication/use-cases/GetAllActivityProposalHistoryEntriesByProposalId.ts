import type { ProposalRepository } from "../../../../proposal/domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../../../proposal/domain/services/ProposalFinder.ts";
import { ProposalId } from "../../../../proposal/domain/value-objects/ProposalId.ts";
import type { ActivityProposalHistoryEntrieRepository } from "../../domain/repositories/ActivityProposalHistoryEntrieRepository.ts";

export class GetAllActivityProposalHistoryEntriesByProposalId {
  private activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrieRepository;
  private readonly proposalFinder: ProposalFinder;
  constructor(
    activityProposalHistoryEntrieRepository: ActivityProposalHistoryEntrieRepository,
    proposalRepository: ProposalRepository,
  ) {
    this.activityProposalHistoryEntrieRepository =
      activityProposalHistoryEntrieRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string) {
    const proposalId = new ProposalId(id);
    // Check proposal existance
    await this.proposalFinder.findById(proposalId);

    return this.activityProposalHistoryEntrieRepository.getAllByProposalId(
      proposalId,
    );
  }
}
