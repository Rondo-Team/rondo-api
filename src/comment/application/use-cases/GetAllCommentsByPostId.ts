import type { PostRepository } from "../../../post/domain/repositories/PostRepository.ts";
import { PostFinder } from "../../../post/domain/services/PostFinder.ts";
import { PostId } from "../../../post/domain/value-objects/PostId.ts";
import type { CommentReadModelRepository } from "../../domain/repositories/CommentReadModelRepository.ts";

export class GetAllCommentsByPostId {
  private commentReadModelRepository: CommentReadModelRepository;
  private readonly postFinder: PostFinder;
  constructor(
    commentReadModelRepository: CommentReadModelRepository,
    postRepository: PostRepository,
  ) {
    this.commentReadModelRepository = commentReadModelRepository;
    this.postFinder = new PostFinder(postRepository);
  }

  async run(id: string) {
    const postId = new PostId(id);
    // Check post existance
    await this.postFinder.findById(postId);
    return this.commentReadModelRepository.getAllByPostId(postId);
  }
}
