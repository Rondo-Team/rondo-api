import { Post } from "@/post/domain/Post";
import { PostCommentsCount } from "@/post/domain/value-objects/PostCommentsCount";
import { PostDescription } from "@/post/domain/value-objects/PostDescription";
import { PostFavouritesCount } from "@/post/domain/value-objects/PostFavouritesCount";
import { PostId } from "@/post/domain/value-objects/PostId";
import { PostProposalsCount } from "@/post/domain/value-objects/PostProposalsCount";
import { PostTags } from "@/post/domain/value-objects/PostTags";
import { PostTitle } from "@/post/domain/value-objects/PostTitle";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { Play } from "@/shared/domain/value-objects/Play";
import { PlayElement } from "@/shared/domain/value-objects/PlayElement";
import { PlayElementType } from "@/shared/domain/value-objects/PlayElementType";
import { PlayStep } from "@/shared/domain/value-objects/PlayStep";
import { UserId } from "@/user/domain/value-objects/UserId";
import { beforeEach, describe, expect, it } from "vitest";

describe("Post model tests", () => {
  let post: Post;
  const element = new PlayElement(
    "550e8420-e29b-41d4-a716-446655440000",
    20,
    30,
    PlayElementType.PLAYER
  );
  const step = new PlayStep([element]);

  const makePost = () =>
    new Post(
      new PostId("550e8400-e29b-41d4-a716-446655440000"),
      new UserId("123e4567-e89b-12d3-a456-426614174000"),
      new PostTitle("Example Post Title"),
      new PostDescription("This is an example post description."),
      new PostFavouritesCount(5),
      new PostCommentsCount(2),
      new PostProposalsCount(1),
      new CreatedAt(new Date("2023-01-01")),
      new PostTags(["tag1", "tag2"]),
      new Play([step])
    );

  beforeEach(() => {
    post = makePost();
  });

  it("creates a post correctly with all fields", () => {
    expect(post.id.value).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(post.userId.value).toBe("123e4567-e89b-12d3-a456-426614174000");
    expect(post.title.value).toBe("Example Post Title");
    expect(post.description.value).toBe("This is an example post description.");
    expect(post.favouritesCount.value).toBe(5);
    expect(post.commentsCount.value).toBe(2);
    expect(post.proposalsCount.value).toBe(1);
    expect(post.createdAt.value).toEqual(new Date("2023-01-01"));
    expect(post.tags.value).toEqual(["tag1", "tag2"]);
    expect(
      post.play.value.map((step) =>
        step.value.map((el) => ({
          id: el.id,
          x: el.x,
          y: el.y,
          elementType: el.elementType,
        }))
      )
    ).toEqual([
      [
        {
          id: "550e8420-e29b-41d4-a716-446655440000",
          x: 20,
          y: 30,
          elementType: "PLAYER",
        },
      ],
    ]);
  });

  it("allows changing the title", () => {
    const newTitle = new PostTitle("New Post Title");
    post.changeTitle(newTitle);
    expect(post.title.value).toBe("New Post Title");
  });

  it("allows changing the description", () => {
    const newDesc = new PostDescription("New description");
    post.changeDescription(newDesc);
    expect(post.description.value).toBe("New description");
  });

  it("allows adding a favourite", () => {
    post.addFavourite();
    expect(post.favouritesCount.value).toBe(6);
  });

  it("allows adding a comment", () => {
    post.addComment();
    expect(post.commentsCount.value).toBe(3);
  });

  it("allows adding a proposal", () => {
    post.addProposal();
    expect(post.proposalsCount.value).toBe(2);
  });

  it("allows changing the play", () => {
    const newElement = new PlayElement(
      "550e8400-e29b-41d4-a716-446655440000",
      10,
      20,
      PlayElementType.PLAYER
    );
    const newStep = new PlayStep([newElement]);
    const newPlay = new Play([newStep]);

    post.changePlay(newPlay);

    expect(
      post.play.value.map((step) =>
        step.value.map((el) => ({
          id: el.id,
          x: el.x,
          y: el.y,
          elementType: el.elementType,
        }))
      )
    ).toEqual([
      [
        {
          id: "550e8400-e29b-41d4-a716-446655440000",
          x: 10,
          y: 20,
          elementType: "PLAYER",
        },
      ],
    ]);
  });
});
