import { PostId } from "@/post/domain/value-objects/PostId";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";
import { UserId } from "@/user/domain/value-objects/UserId";
import { PostFavourite } from "../PostFavourite";

export interface PostFavouriteRepository {
  create(favourite: PostFavourite): Promise<void>;
  getOneById(id: FavouriteId): Promise<PostFavourite | undefined>;
  existsWithId(id: UserId): Promise<boolean>;
  existsWithUserId(userId: UserId): Promise<boolean>;
  getAllByPostId(postId: PostId): Promise<PostFavourite[] | undefined>
  getAllByUserId(userId: UserId): Promise<PostFavourite[] | undefined>
  deleteById(id: FavouriteId): Promise<void>;
}