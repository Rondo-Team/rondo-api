import { PostId } from "@/post/domain/value-objects/PostId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserId } from "@/user/domain/value-objects/UserId";
import { CommentFavouritesCount } from "./value-objects/CommentFavouritesCount";
import { CommentId } from "./value-objects/CommentId";
import { CommentMessage } from "./value-objects/CommentMessage";

type ParentId = CommentId | null;

export class Comment {
  id: CommentId;
  parentId: ParentId;
  userId: UserId;
  postId: PostId;
  message: CommentMessage;
  favouritesCount: CommentFavouritesCount;
  createdAt: CreatedAt;

  constructor(
    id: CommentId,
    userId: UserId,
    postId: PostId,
    message: CommentMessage,
    favouritesCount: CommentFavouritesCount,
    createdAt: CreatedAt,
    parentId: ParentId = null
  ) {
    this.id = id;
    this.parentId = parentId;
    this.userId = userId;
    this.postId = postId;
    this.message = message;
    this.favouritesCount = favouritesCount;
    this.createdAt = createdAt;
  }
}
