import type { Primitives } from "../../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Favourite } from "../../../shared/favourite/domain/Favourite.ts";
import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

export type PostFavouritePrimitives = Primitives<PostFavourite>;

export class PostFavourite extends Favourite {
  postId: PostId;
  constructor(
    id: FavouriteId,
    userId: UserId,
    createdAt: CreatedAt,
    postId: PostId
  ) {
    super(id, userId, createdAt);
    this.postId = postId;
  }

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      userId: this.userId.toPrimitives(),
      createdAt: this.createdAt.toPrimitives(),
      postId: this.postId.toPrimitives(),
    };
  }

  static fromPrimitives(postFavourite: PostFavouritePrimitives) {
    return new PostFavourite(
      FavouriteId.fromPrimitives(postFavourite.id),
      UserId.fromPrimitives(postFavourite.userId),
      CreatedAt.fromPrimitives(postFavourite.createdAt),
      PostId.fromPrimitives(postFavourite.postId)
    );
  }
}
