import { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class DeleteById {
  private readonly proposalFinder: ProposalFinder;
  constructor(private proposalRepository: ProposalRepository) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string) {
    const proposalId = new ProposalId(id);
    await this.proposalFinder.findById(proposalId);

    return this.proposalRepository.deleteById(proposalId);
  }
}
