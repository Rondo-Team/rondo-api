import { CommentNotFoundByIdError } from "../../domain/errors/CommentNotFoundByIdError.ts";
import type { CommentReadModelRepository } from "../../domain/repositories/CommentReadModelRepository.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export class GetCommentById {
  private commentReadModelRepository: CommentReadModelRepository;
  constructor(commentReadModelRepository: CommentReadModelRepository) {
    this.commentReadModelRepository = commentReadModelRepository;
  }

  async run(id: string) {
    const comment = await this.commentReadModelRepository.getOneById(
      CommentId.fromPrimitives(id),
    );
    if (!comment) throw new CommentNotFoundByIdError(id);
    return comment;
  }
}
