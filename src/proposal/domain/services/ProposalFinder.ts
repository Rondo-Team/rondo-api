import { ProposalNotFoundByIdError } from "../errors/ProposalNotFoundByIdError.ts";
import { ProposalRepository } from "../repositories/ProposalRepository.ts";
import { ProposalId } from "../value-objects/ProposalId.ts";

export class ProposalFinder {
  constructor(private proposalRepository: ProposalRepository) {}

  async findById(id: ProposalId) {
    const proposal = await this.proposalRepository.getOneById(id);
    if (!proposal) throw new ProposalNotFoundByIdError(id.toPrimitives());
    return proposal;
  }
}
