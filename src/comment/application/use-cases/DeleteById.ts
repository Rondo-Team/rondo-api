import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { CommentFinder } from "@/comment/domain/services/CommentFinder";
import { CommentId } from "@/comment/domain/value-objects/CommentId";

export class DeleteById {
  private commentFinder: CommentFinder;
  constructor(private commentRepository: CommentRepository) {
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    const comment = await this.commentFinder.findById(new CommentId(id));
    return this.commentRepository.deleteById(comment.id);
  }
}
