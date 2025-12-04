import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";

export class GetAllByPostId {
  private commentRepository: CommentRepository
  private readonly postFinder: PostFinder;
  constructor(
    commentRepository: CommentRepository,
    postRepository: PostRepository
  ) {
    this.commentRepository = commentRepository
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    // Check post existance
    await this.postFinder.findById(postId);
    return this.commentRepository.getAllByPostId(postId);
  }
}
