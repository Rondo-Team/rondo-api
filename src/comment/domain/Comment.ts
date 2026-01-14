import { PostId } from "../../post/domain/value-objects/PostId.ts";
import type { Primitives } from "../../shared/domain/types/Primitives.ts";
import { CreatedAt } from "../../shared/domain/value-objects/CreatedAt.ts";
import { UserId } from "../../user/domain/value-objects/UserId.ts";
import { CommentFavouritesCount } from "./value-objects/CommentFavouritesCount.ts";
import { CommentId } from "./value-objects/CommentId.ts";
import { CommentMessage } from "./value-objects/CommentMessage.ts";

type ParentId = CommentId | null;

export type CommentPrimitives = Primitives<Comment>;

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

  toPrimitives() {
    return {
      id: this.id.toPrimitives(),
      userId: this.userId.toPrimitives(),
      postId: this.postId.toPrimitives(),
      message: this.message.toPrimitives(),
      favouritesCount: this.favouritesCount.toPrimitives(),
      craetedAt: this.createdAt.toPrimitives(),
      parentId: this.parentId?.toPrimitives(),
    };
  }

  static fromPrimitives(comment: CommentPrimitives) {
    return new Comment(
      CommentId.fromPrimitives(comment.id),
      UserId.fromPrimitives(comment.userId),
      PostId.fromPrimitives(comment.postId),
      CommentMessage.fromPrimitives(comment.message),
      CommentFavouritesCount.fromPrimitives(comment.favouritesCount),
      CreatedAt.fromPrimitives(comment.craetedAt),
      comment.parentId ? CommentId.fromPrimitives(comment.parentId) : null
    );
  }

  addFavourite() {
    this.favouritesCount = new CommentFavouritesCount(
      this.favouritesCount.toPrimitives() + 1
    );
  }
}
