import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";
import { ProposalFinder } from "@/proposal/domain/services/ProposalFinder";
import { ProposalDescription } from "@/proposal/domain/value-objects/ProposalDescription";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { ProposalTitle } from "@/proposal/domain/value-objects/ProposalTitle";

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