import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Favourite } from "@/shared/favourite/domain/Favourite";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";
import { UserId } from "@/user/domain/value-objects/UserId";

export class CommentFavourite extends Favourite {
  commentId: CommentId
  constructor(id: FavouriteId, userId: UserId, createdAt: CreatedAt, commentId: CommentId) {
    super(id, userId, createdAt)
    this.commentId = commentId
  }
}