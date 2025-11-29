import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CommentFavouriteRepository } from "../domain/repositories/CommentFavouriteRepository";

export class GetAllByPostId {
  constructor(private commentFavouriteRepository: CommentFavouriteRepository) { }

  async run(commentId: CommentId) {
    this.commentFavouriteRepository.getAllByCommentId(commentId)
  }
}