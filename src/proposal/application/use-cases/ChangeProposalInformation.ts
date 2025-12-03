import { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalDescription } from "../../domain/value-objects/ProposalDescription.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";
import { ProposalTitle } from "../../domain/value-objects/ProposalTitle.ts";

export class ChangeProposalInformation {
  private readonly proposalFinder: ProposalFinder;
  constructor(private proposalRepository: ProposalRepository) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string, newTitle: string, newDescription: string) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));

    proposal.changeTitle(new ProposalTitle(newTitle));
    proposal.changeDescription(new ProposalDescription(newDescription));

    return this.proposalRepository.edit(proposal);
  }
}
