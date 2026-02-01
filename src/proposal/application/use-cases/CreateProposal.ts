import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { PlayDTO } from "../../../shared/application/dtos/PlayDTO.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Play } from "../../../shared/domain/value-objects/Play.ts";
import type { UserRepository } from "../../../user/domain/repositories/UserRepository.ts";
import { UserFinder } from "../../../user/domain/services/UserFinder.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { ProposalWithIdAlreadyExistsError } from "../../domain/errors/ProposalWithIdAlreadyExistsError.ts";
import { Proposal } from "../../domain/Proposal.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";
import { ProposalDescription } from "../../domain/value-objects/ProposalDescription.ts";
import { ProposalId } from "../../domain/value-objects/ProposalId.ts";
import { ProposalTitle } from "../../domain/value-objects/ProposalTitle.ts";

export class CreateProposal {
  private proposalRepository: ProposalRepository;
  private postRepository: PostRepository;
  private userRepository: UserRepository;
  private readonly userFinder: UserFinder;
  private readonly postFinder: PostFinder;
  constructor(
    proposalRepository: ProposalRepository,
    postRepository: PostRepository,
    userRepository: UserRepository
  ) {
    this.proposalRepository = proposalRepository;
    this.postRepository = postRepository;
    this.userRepository = userRepository;
    this.userFinder = new UserFinder(userRepository);
    this.postFinder = new PostFinder(postRepository);
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
      Play.fromPrimitives(playDTO)
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
    await this.postRepository.edit(post);

    return this.proposalRepository.create(proposal);
  }
}
