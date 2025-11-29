import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { PostRepository } from "@/post/domain/repositories/PostRepository";
import { PostFinder } from "@/post/domain/services/PostFinder";
import { PostId } from "@/post/domain/value-objects/PostId";

export class GetAllByPostId {
  private readonly postFinder: PostFinder
  constructor(private commentRepository: CommentRepository, postRepository: PostRepository) {
    this.postFinder = new PostFinder(postRepository)
   }

  async run(id: string) {
    const postId = new PostId(id)
    // Check post existance
    await this.postFinder.findById(postId)
    return this.commentRepository.getAllByPostId(postId);
  }
}