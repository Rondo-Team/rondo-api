import { beforeEach, describe, expect, it } from "vitest";

import { HashedPassword } from "@/shared/password-hashing/domain/value-objects/HashedPassword";
import { comment } from "@/comment/domain/comment";
import { commentCommentsCount } from "@/comment/domain/value-objects/commentCommentsCount";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { commentEmail } from "@/comment/domain/value-objects/commentEmail";
import { commentFavouritePostsCount } from "@/comment/domain/value-objects/commentFavouritePostsCount";
import { commentId } from "@/comment/domain/value-objects/commentId";
import { commentName } from "@/comment/domain/value-objects/commentName";
import { commentPostsCount } from "@/comment/domain/value-objects/commentPostsCount";
import { commentProfilePicture } from "@/comment/domain/value-objects/commentProfilePicture";
import { commentProposalsCount } from "@/comment/domain/value-objects/commentProposalsCount";
import { commentname } from "@/comment/domain/value-objects/commentname";
import { Comment } from "@/comment/domain/Comment";
import { CommentMessage } from "@/comment/domain/value-objects/CommentMessage";
import { PostId } from "@/post/domain/value-objects/PostId";
import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { UserId } from "@/user/domain/value-objects/UserId";

describe("Comment model tests", () => {
  let comment: Comment;

  const makeComment = () =>
    new Comment(
      new CommentId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("550e8400-e29b-41d4-a716-446655440000"),
      new PostId("550e8400-e29b-41d4-a716-446655440000"),
      new CommentMessage("ExampleMessage"),
      new CreatedAt(new Date("2020-01-01"))
    );

  beforeEach(() => {
    comment = makeComment();
  });

  it("creates a comment correctly with all fields", () => {
    expect(comment.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(comment.userId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(comment.postId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(comment.message.value).toBe("saul");
    expect(comment.createdAt.value).toEqual(new Date("2020-01-01"));
  });
});