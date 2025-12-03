import { PostId } from "../../post/domain/value-objects/PostId.ts";
import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { CommentFavouritesCount } from "./value-objects/CommentFavouritesCount.ts";
import { CommentId } from "./value-objects/CommentId.ts";
import { CommentMessage } from "./value-objects/CommentMessage.ts";

type ParentId = CommentId | null;

export class Comment {
  id: CommentId;
  userId: UserId;
  postId: PostId;
  message: CommentMessage;
  favouritesCount: CommentFavouritesCount;
  createdAt: CreatedAt;
  parentId: ParentId;

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
    this.userId = userId;
    this.postId = postId;
    this.message = message;
    this.favouritesCount = favouritesCount;
    this.createdAt = createdAt;
    this.parentId = parentId;
  }

  addFavourite() {
    this.favouritesCount = new CommentFavouritesCount(
      this.favouritesCount.toPrimitives() + 1
    );
  }
}
