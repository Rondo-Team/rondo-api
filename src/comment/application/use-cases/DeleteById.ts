import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export class DeleteById {
  private commentRepository: CommentRepository
  private commentFinder: CommentFinder;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    const commentId = new CommentId(id);
    // Check comment existance
    await this.commentFinder.findById(commentId);
    return this.commentRepository.deleteById(commentId);
  }
}
