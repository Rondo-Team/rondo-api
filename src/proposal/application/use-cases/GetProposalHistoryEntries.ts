import type { ProposalReadModelRepository } from "../../domain/repositories/ProposalReadModelRepository.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class GetProposalHistoryEntries {
  private proposalReadModelRepository: ProposalReadModelRepository;
  constructor(proposalReadModelRepository: ProposalReadModelRepository) {
    this.proposalReadModelRepository = proposalReadModelRepository;
  }

  async run(id: string) {
    const historyEntries =
      await this.proposalReadModelRepository.getHistoryEntries(
        ProposalId.fromPrimitives(id),
      );
    return historyEntries;
  }
}
