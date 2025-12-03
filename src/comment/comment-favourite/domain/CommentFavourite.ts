import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Favourite } from "../../../shared/favourite/domain/Favourite.ts";
import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export class CommentFavourite extends Favourite {
  commentId: CommentId;
  constructor(
    id: FavouriteId,
    userId: UserId,
    createdAt: CreatedAt,
    commentId: CommentId
  ) {
    super(id, userId, createdAt);
    this.commentId = commentId;
  }
}
