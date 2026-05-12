import type { PostId } from "../../../../post/domain/value-objects/PostId.ts";
import { FavouriteId } from "../../../../shared/favourite/domain/value-objects/FavouriteId.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";
import { CommentId } from "../../../domain/value-objects/CommentId.ts";
import { CommentFavourite } from "../CommentFavourite.ts";

export interface CommentFavouriteRepository {
  create(favourite: CommentFavourite): Promise<void>;
  getOneById(id: FavouriteId): Promise<CommentFavourite | undefined>;
  getAllByCommentId(commentId: CommentId): Promise<CommentFavourite[]>;
  getAllByUserIdAndPostId(userId: UserId, postId: PostId): Promise<CommentFavourite[]>;
  existsWithId(id: UserId): Promise<boolean>;
  existsWithUserId(userId: UserId): Promise<boolean>;
  deleteById(id: FavouriteId): Promise<void>;
}
