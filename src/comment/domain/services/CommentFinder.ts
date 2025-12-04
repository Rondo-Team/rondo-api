import { CommentNotFoundByIdError } from "../errors/CommentNotFoundByIdError.ts";
import type { CommentRepository } from "../repositories/CommentRepository.ts";
import { CommentId } from "../value-objects/CommentId.ts";

export class CommentFinder {
  private commentRepository: CommentRepository;
  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async findById(id: CommentId) {
    const comment = await this.commentRepository.getOneById(id);
    if (!comment) throw new CommentNotFoundByIdError(id.toPrimitives());
    return comment;
  }
}
