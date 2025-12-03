import { CommentNotFoundByIdError } from "../errors/CommentNotFoundByIdError.ts";
import { CommentRepository } from "../repositories/CommentRepository.ts";
import { CommentId } from "../value-objects/CommentId.ts";

export class CommentFinder {
  constructor(private commentRepository: CommentRepository) {}

  async findById(id: CommentId) {
    const comment = await this.commentRepository.getOneById(id);
    if (!comment) throw new CommentNotFoundByIdError(id.toPrimitives());
    return comment;
  }
}
