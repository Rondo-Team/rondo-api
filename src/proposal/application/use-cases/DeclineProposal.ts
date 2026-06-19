import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalIsAlreadyClosedError } from "../../domain/errors/ProposalIsAlreadyClosedError.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";
import { ProposalStatusValues } from "../../domain/value-objects/ProposalStatus.ts";

export class DeclineProposal {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  private readonly postFinder: PostFinder;
  private resourceAccessChecker: ResourceAccessChecker;

  constructor(
    proposalRepository: ProposalRepository,
    postRepository: PostRepository,
  ) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, actorId: string) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    if (proposal.isClosed()) throw new ProposalIsAlreadyClosedError(id);

    const post = await this.postFinder.findById(proposal.postId);
    await this.resourceAccessChecker.check(
      post.userId,
      UserId.fromPrimitives(actorId),
    );

    proposal.changeStatus(ProposalStatusValues.CLOSED);

    return this.proposalRepository.edit(proposal);
  }
}
