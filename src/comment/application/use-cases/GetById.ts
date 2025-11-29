import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";
import { CommentFinder } from "@/comment/domain/services/CommentFinder";
import { CommentId } from "@/comment/domain/value-objects/CommentId";

export class GetById {
  private commentFinder: CommentFinder;
  constructor(commentRepository: CommentRepository) {
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    return this.commentFinder.findById(new CommentId(id));
  }
}
