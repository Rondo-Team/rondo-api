import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";
import { ProposalFinder } from "@/proposal/domain/services/ProposalFinder";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { PlayDTO } from "@/shared/application/dtos/PlayDTO";
import { Play } from "@/shared/domain/value-objects/Play";

export class ChangePlay {
  private readonly proposalFinder: ProposalFinder;
  constructor(private proposalRepository: ProposalRepository) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    proposal.changePlay(Play.fromPrimitives(newPlay.steps))

    return this.proposalRepository.edit(proposal);
  }
}