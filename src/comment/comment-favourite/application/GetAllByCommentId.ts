import { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";
import { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository.ts";

export class GetAllByPostId {
  private readonly commentFinder: CommentFinder;
  constructor(
    private commentFavouriteRepository: CommentFavouriteRepository,
    commentRepository: CommentRepository
  ) {
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    const commentId = new CommentId(id);
    await this.commentFinder.findById(commentId);
    this.commentFavouriteRepository.getAllByCommentId(commentId);
  }
}
