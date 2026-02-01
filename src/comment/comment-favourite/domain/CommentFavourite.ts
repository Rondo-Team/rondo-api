import type { Primitives } from "../../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Favourite } from "../../../shared/favourite/domain/Favourite.ts";
import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { CommentId } from "../../domain/value-objects/CommentId.ts";

export type CommentFavouritePrimitives = Primitives<CommentFavourite>;

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

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      userId: this.userId.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
      commentId: this.commentId.toPrimitives(),
    };
  }

  static fromPrimitives(commentFavourite: CommentFavouritePrimitives) {
    return new CommentFavourite(
      FavouriteId.fromPrimitives(commentFavourite.id),
      UserId.fromPrimitives(commentFavourite.userId),
      CreatedAt.fromPrimitives(commentFavourite.createdAt),
      CommentId.fromPrimitives(commentFavourite.commentId)
    );
  }
}
