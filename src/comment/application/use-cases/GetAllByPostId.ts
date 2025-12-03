import { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import { CommentRepository } from "../../domain/repositories/CommentRepository.ts";

export class GetAllByPostId {
  private readonly postFinder: PostFinder;
  constructor(
    private commentRepository: CommentRepository,
    postRepository: PostRepository
  ) {
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    // Check post existance
    await this.postFinder.findById(postId);
    return this.commentRepository.getAllByPostId(postId);
  }
}
