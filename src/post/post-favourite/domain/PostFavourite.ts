import { PostId } from "@/post/domain/value-objects/PostId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Favourite } from "@/shared/favourite/domain/Favourite";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";
import { UserId } from "@/user/domain/value-objects/UserId";

export class PostFavourite extends Favourite {
  postId: PostId
  constructor(id: FavouriteId, userId: UserId, createdAt: CreatedAt, postId: PostId) {
    super(id, userId, createdAt)
    this.postId = postId
  }
}