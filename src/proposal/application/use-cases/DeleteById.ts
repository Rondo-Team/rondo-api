import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";
import { ProposalFinder } from "@/proposal/domain/services/ProposalFinder";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";

export class DeleteById {
  private readonly proposalFinder: ProposalFinder
  constructor(
    private proposalRepository: ProposalRepository,
  ) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(
    id: string,
  ) {
    const proposalId = new ProposalId(id)
    await this.proposalFinder.findById(proposalId)

    return this.proposalRepository.deleteById(proposalId);
  }
}