import { CreatedAt } from "../../../shared/domain/value-objects/CreatedAt.ts";
import { Favourite } from "../../../shared/favourite/domain/Favourite.ts";
import { FavouriteId } from "../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../user/domain/value-objects/UserId.ts";
import { PostId } from "../../domain/value-objects/PostId.ts";

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
}
