import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export class GetById {
  private commentFinder: CommentFinder;
  constructor(commentRepository: CommentRepository) {
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    return this.commentFinder.findById(new CommentId(id));
  }
}
