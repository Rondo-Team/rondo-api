import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";

export class GetAllProposalsByPostId {
  private proposalRepository: ProposalRepository;
  private readonly postFinder: PostFinder;
  constructor(
    proposalRepository: ProposalRepository,
    postRepository: PostRepository,
  ) {
    this.proposalRepository = proposalRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    await this.postFinder.findById(postId);

    return this.proposalRepository.getAllByPostId(postId);
  }
}
