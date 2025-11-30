import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";
import { ProposalWithIdAlreadyExistsError } from "@/proposal/domain/errors/ProposalWithIdAlreadyExistsError";
import { Proposal } from "@/proposal/domain/Proposal";
import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";
import { ProposalDescription } from "@/proposal/domain/value-objects/ProposalDescription";
import { ProposalId } from "@/proposal/domain/value-objects/ProposalId";
import { ProposalTitle } from "@/proposal/domain/value-objects/ProposalTitle";
import { PlayDTO } from "@/shared/application/dtos/PlayDTO";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { UserRepository } from "@/user/domain/repositories/UserRepository";
import { UserFinder } from "@/user/domain/services/UserFinder";
import { UserId } from "@/user/domain/value-objects/UserId";

export class CreateProposal {
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  constructor(
    private proposalRepository: ProposalRepository,
    private postRepository: PostRepository,
    private userRepository: UserRepository
  ) {
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository)
  }

  async run(
    id: string,
    userId: string,
    postId: string,
    title: string,
    description: string,
    createdAt: Date,
    playDTO: PlayDTO
  ) {
    const proposal = new Proposal(
      new ProposalId(id),
      new UserId(userId),
      new PostId(postId),
      new ProposalTitle(title),
      new ProposalDescription(description),
      new CreatedAt(createdAt),
      Play.fromPrimitives(playDTO.steps)
    );

    // Ensure ProposaltId do not already exists
    if (await this.proposalRepository.existsWithId(new ProposalId(id)))
      throw new ProposalWithIdAlreadyExistsError(id);

    const user = await this.userFinder.findById(new UserId(userId));
    const post = await this.postFinder.findById(new PostId(postId));
    //Triggers an user and post proposalsCount update
    user.addProposal();
    post.addProposal();
    await this.userRepository.edit(user);
    await this.postRepository.edit(post)

    return this.proposalRepository.create(proposal);
  }
}