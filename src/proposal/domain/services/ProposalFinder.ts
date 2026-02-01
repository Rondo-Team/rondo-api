import { ProposalNotFoundByIdError } from "../errors/ProposalNotFoundByIdError.ts";
import { type ProposalRepository } from "../repositories/ProposalRepository.ts";
import { ProposalId } from "../value-objects/ProposalId.ts";

export class ProposalFinder {
  private proposalRepository: ProposalRepository;
  constructor(proposalRepository: ProposalRepository) {
    this.proposalRepository = proposalRepository;
  }

  async findById(id: ProposalId) {
    const proposal = await this.proposalRepository.getOneById(id);
    if (!proposal) throw new ProposalNotFoundByIdError(id.toPrimitives());
    return proposal;
  }
}
