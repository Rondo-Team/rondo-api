import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository";
import { CommentFinder } from "@/comment/domain/services/CommentFinder";
import { CommentRepository } from "@/comment/domain/repositories/CommentRepository";

export class GetAllByPostId {
  private readonly commentFinder: CommentFinder
  constructor(private commentFavouriteRepository: CommentFavouriteRepository, commentRepository: CommentRepository) {
    this.commentFinder = new CommentFinder(commentRepository)
   }

  async run(id: string) {
    const commentId = new CommentId(id)
    await this.commentFinder.findById(commentId)
    this.commentFavouriteRepository.getAllByCommentId(commentId)
  }
}