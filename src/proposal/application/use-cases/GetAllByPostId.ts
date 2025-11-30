import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";
import { ProposalRepository } from "@/proposal/domain/repositories/ProposalRepository";

export class GetAllByPostId {
  private readonly postFinder: PostFinder
  constructor(
    private proposalRepository: ProposalRepository,
    postRepository: PostRepository
  ) {
    this.postFinder = new PostFinder(postRepository)
  }

  async run(
    id: string,
  ) {
    const postId = new PostId(id)
    await this.postFinder.findById(postId)

    return this.proposalRepository.getAllByUserId(postId);
  }
}