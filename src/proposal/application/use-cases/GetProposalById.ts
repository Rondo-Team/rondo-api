import { ProposalNotFoundByIdError } from "../../domain/errors/ProposalNotFoundByIdError.ts";
import type { ProposalReadModelRepository } from "../../domain/repositories/ProposalReadModelRepository.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class GetProposalById {
  private proposalReadModelRepository: ProposalReadModelRepository;
  constructor(proposalReadModelRepository: ProposalReadModelRepository) {
    this.proposalReadModelRepository = proposalReadModelRepository;
  }

  async run(id: string) {
    const proposal = await this.proposalReadModelRepository.getOneById(
      ProposalId.fromPrimitives(id),
    );
    if (!proposal) throw new ProposalNotFoundByIdError(id);
    return proposal;
  }
}
