import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { PostId } from "../../../domain/value-objects/PostId.ts";
import { PostFavourite } from "../PostFavourite.ts";

export interface PostFavouriteRepository {
  create(favourite: PostFavourite): Promise<void>;
  getOneById(id: FavouriteId): Promise<PostFavourite | undefined>;
  existsWithId(id: FavouriteId): Promise<boolean>;
  existsWithUserAndPostId(userId: UserId, postId: PostId): Promise<boolean>;
  getAllByPostId(postId: PostId): Promise<PostFavourite[] | undefined>;
  getAllByUserId(userId: UserId): Promise<PostFavourite[] | undefined>;
  deleteById(id: FavouriteId): Promise<void>;
}
