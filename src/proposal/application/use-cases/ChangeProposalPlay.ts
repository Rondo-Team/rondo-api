import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class ChangeProposalPlay {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(proposalRepository: ProposalRepository) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(id: string, newPlay: PlayDTO, actorId: string) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    await this.resourceAccessChecker.check(
      UserId.fromPrimitives(actorId),
      proposal.userId,
    );

    proposal.changePlay(Play.fromPrimitives(newPlay));

    return this.proposalRepository.edit(proposal);
  }
}
