import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalIsAlreadyClosedError } from "../../domain/errors/ProposalIsAlreadyClosedError.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class AcceptProposal {
  private proposalRepository: ProposalRepository;
  private readonly proposalFinder: ProposalFinder;
  private readonly postFinder: PostFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  private postRepository: PostRepository;

  constructor(
    proposalRepository: ProposalRepository,
    postRepository: PostRepository,
  ) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
    this.postRepository = postRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, actorId: string) {
    const proposal = await this.proposalFinder.findById(new ProposalId(id));
    if (proposal.isClosed()) throw new ProposalIsAlreadyClosedError(id);

    const actorUserId = UserId.fromPrimitives(actorId);

    const post = await this.postFinder.findById(proposal.postId);
    await this.resourceAccessChecker.check(post.userId, actorUserId);

    proposal.accept(actorUserId, CreatedAt.now());
    post.changePlay(proposal.play);

    await this.postRepository.edit(post);
    return this.proposalRepository.edit(proposal);
  }
}
