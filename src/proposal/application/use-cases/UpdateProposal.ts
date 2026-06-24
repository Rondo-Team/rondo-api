import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalIsAlreadyClosedError } from "../../domain/errors/ProposalIsAlreadyClosedError.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalDescription } from "../../domain/value-objects/ProposalDescription.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";
import { ProposalTitle } from "../../domain/value-objects/ProposalTitle.ts";

export class UpdateProposal {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  private resourceAccessChecker: ResourceAccessChecker;

  constructor(proposalRepository: ProposalRepository) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
  }

  async run(
    id: string,
    actorId: string,
    newTitle?: string,
    newDescription?: string,
    newPlay?: PlayDTO,
  ) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    if (proposal.isClosed()) throw new ProposalIsAlreadyClosedError(id);

    const userActorId = UserId.fromPrimitives(actorId);

    await this.resourceAccessChecker.check(proposal.userId, userActorId);

    if (newTitle) proposal.changeTitle(ProposalTitle.fromPrimitives(newTitle));
    if (newDescription)
      proposal.changeDescription(
        ProposalDescription.fromPrimitives(newDescription),
      );
    if (newPlay) proposal.changePlay(Play.fromPrimitives(newPlay));

    proposal.registerUpdate(userActorId, CreatedAt.now());

    return this.proposalRepository.edit(proposal);
  }
}
