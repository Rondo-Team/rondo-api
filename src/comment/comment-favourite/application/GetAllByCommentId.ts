import type { CommentRepository } from "../../domain/repositories/CommentRepository.ts";
import { CommentFinder } from "../../domain/services/CommentFinder.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";
import type { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository.ts";

export class GetAllByPostId {
  private commentFavouriteRepository: CommentFavouriteRepository;
  private readonly commentFinder: CommentFinder;
  constructor(
    commentFavouriteRepository: CommentFavouriteRepository,
    commentRepository: CommentRepository
  ) {
    this.commentFavouriteRepository = commentFavouriteRepository;
    this.commentFinder = new CommentFinder(commentRepository);
  }

  async run(id: string) {
    const commentId = new CommentId(id);
    await this.commentFinder.findById(commentId);
    this.commentFavouriteRepository.getAllByCommentId(commentId);
  }
}
