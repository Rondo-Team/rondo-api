import { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { ProposalRepository } from "../../domain/repositories/ProposalRepository.ts";

export class GetAllByPostId {
  private readonly postFinder: PostFinder;
  constructor(
    private proposalRepository: ProposalRepository,
    postRepository: PostRepository
  ) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    await this.postFinder.findById(postId);

    return this.proposalRepository.getAllByUserId(postId);
  }
}
