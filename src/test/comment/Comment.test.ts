import { beforeEach, describe, expect, it } from "vitest";

import { Comment } from "@/comment/domain/Comment";
import { CommentId } from "@/comment/domain/value-objects/CommentId";
import { CommentMessage } from "@/comment/domain/value-objects/CommentMessage";
import { PostId } from "@/post/domain/value-objects/PostId";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { UserId } from "@/user/domain/value-objects/UserId";
import { CommentFavouritesCount } from "@/comment/domain/value-objects/CommentFavouritesCount";

describe("Comment model tests", () => {
  let comment: Comment;

  const makeComment = () =>
    new Comment(
      new CommentId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("550e8400-e29b-41d4-a716-446655440000"),
      new PostId("550e8400-e29b-41d4-a716-446655440000"),
      new CommentMessage("ExampleMessage"),
      new CommentFavouritesCount(1),
      new CreatedAt(new Date("2020-01-01"))
    );

  beforeEach(() => {
    comment = makeComment();
  });

  it("creates a comment correctly with all fields", () => {
    expect(comment.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(comment.userId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(comment.postId.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(comment.message.value).toBe("ExampleMessage");
    expect(comment.favouritesCount.value).toBe(1)
    expect(comment.createdAt.value).toEqual(new Date("2020-01-01"));
  });

  it("adds a favourite to the count", () => {
    comment.addFavourite()
    expect(comment.favouritesCount.value).toBe(2)
  })
});
