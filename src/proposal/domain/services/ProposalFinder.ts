import { ProposalNotFoundByIdError } from "../errors/ProposalNotFoundByIdError";
import { ProposalRepository } from "../repositories/ProposalRepository";
import { ProposalId } from "../value-objects/ProposalId";

export class ProposalFinder {
  constructor(private proposalRepository: ProposalRepository) {}

  async findById(id: ProposalId) {
    const proposal = await this.proposalRepository.getOneById(id);
    if (!proposal) throw new ProposalNotFoundByIdError(id.toPrimitives());
    return proposal;
  }
}
