import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class ChangePlay {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  constructor(proposalRepository: ProposalRepository) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
  }

  async run(id: string, newPlay: PlayDTO) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    proposal.changePlay(Play.fromPrimitives(newPlay.steps));

    return this.proposalRepository.edit(proposal);
  }
}
