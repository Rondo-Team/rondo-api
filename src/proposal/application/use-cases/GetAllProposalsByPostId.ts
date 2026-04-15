import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { ProposalReadModelRepository } from "../../domain/repositories/ProposalReadModelRepository.ts";

export class GetAllProposalsByPostId {
  private proposalReadModelRepository: ProposalReadModelRepository;
  private readonly postFinder: PostFinder;
  constructor(
    proposalReadModelRepository: ProposalReadModelRepository,
    postRepository: PostRepository,
  ) {
    this.proposalReadModelRepository = proposalReadModelRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    await this.postFinder.findById(postId);

    return this.proposalReadModelRepository.getAllByPostId(postId);
  }
}
