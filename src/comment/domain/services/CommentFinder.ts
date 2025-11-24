import { CommentNotFoundByIdError } from "../errors/CommentNotFoundByIdError";
import { CommentRepository } from "../repositories/CommentRepository";
import { CommentId } from "../value-objects/CommentId";

export class CommentFinder {
  constructor(private commentRepository: CommentRepository) {}

  async findById(id: CommentId) {
    const comment = await this.commentRepository.getOneById(id);
    if (!comment) throw new CommentNotFoundByIdError(id.toPrimitives());
    return comment;
  }
}
