import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { FavouriteId } from "@/shared/favourite/domain/value-objects/FavouriteId";
import { UserId } from "@/user/domain/value-objects/UserId";
import { CommentFavourite } from "../CommentFavourite";

export interface CommentFavouriteRepository {
  create(favourite: CommentFavourite): Promise<void>;
  getOneById(id: FavouriteId): Promise<CommentFavourite | undefined>;
  getAllByCommentId(commentId: CommentId): Promise<CommentFavourite[] | undefined>;
  existsWithId(id: UserId): Promise<boolean>;
  existsWithUserId(userId: UserId): Promise<boolean>;
  deleteById(id: FavouriteId): Promise<void>;
}