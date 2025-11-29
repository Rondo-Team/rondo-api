import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { CommentFinder } from "@/comment/domain/services/CommentFinder";
import { CommentId } from "@/comment/domain/value-objects/CommentId";

export class DeleteById {
  private commentFinder: CommentFinder;
  constructor(private commentRepository: CommentRepository) {
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    const commentId = new CommentId(id)
    // Check comment existance
    await this.commentFinder.findById(commentId);
    return this.commentRepository.deleteById(commentId);
  }
}
