import { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class ChangePlay {
  private readonly proposalFinder: ProposalFinder;
  constructor(private proposalRepository: ProposalRepository) {
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    proposal.changePlay(Play.fromPrimitives(newPlay.steps));

    return this.proposalRepository.edit(proposal);
  }
}
