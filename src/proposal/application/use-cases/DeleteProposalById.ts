import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { ResourceAccessChecker } from "../../../shared/domain/services/ResourceAccessChecker.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalFinder } from "../../domain/services/ProposalFinder.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";

export class DeleteProposalById {
  private proposalRepository: ProposalRepository;
  private userRepository: UserRepository;
  private postRepository: PostRepository;
  private readonly proposalFinder: ProposalFinder;
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  private resourceAccessChecker: ResourceAccessChecker;
  constructor(
    proposalRepository: ProposalRepository,
    userRepository: UserRepository,
    postRepository: PostRepository,
  ) {
    this.proposalRepository = proposalRepository;
    this.proposalFinder = new ProposalFinder(proposalRepository);
    this.resourceAccessChecker = new ResourceAccessChecker();
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string, actorId: string) {
    const proposalId = ProposalId.fromPrimitives(id);
    const actorUserId = UserId.fromPrimitives(actorId);

    const proposal = await this.proposalFinder.findById(proposalId);
    await this.resourceAccessChecker.check(actorUserId, proposal.userId);

    const post = await this.postFinder.findById(proposal.postId);
    console.log("3");

    const user = await this.userFinder.findById(actorUserId);
    console.log("4");

    // Triggers user and post updates
    user.deleteProposal();
    await this.userRepository.edit(user);

    post.deleteProposal();
    await this.postRepository.edit(post);

    return this.proposalRepository.deleteById(proposalId);
  }
}
