import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class GetProposalById {
  private proposalFinder: ProposalFinder;
  constructor(proposalRepository: ProposalRepository) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string) {
    return this.proposalFinder.findById(ProposalId.fromPrimitives(id));
  }
}
