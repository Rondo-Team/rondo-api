import { PostTitleIsTooLongError } from "@/post/domain/errors/PostTitleIsTooLongError";
import { PostTitleIsTooShortError } from "@/post/domain/errors/PostTitleIsTooShortError";
import { PostTitle } from "@/post/domain/value-objects/PostTitle";
import { describe, expect, it } from "vitest";

describe("Post title tests", () => {
  it("does not fail if post title is valid", () => {
    expect(() => new PostTitle("Example Post Title")).not.toThrow();
  });

  it("throws an error if post title is too short", () => {
    expect(() => new PostTitle("Ex")).toThrowError(PostTitleIsTooShortError);
  });

  it("throws an error if post title is too long", () => {
    expect(
      () => new PostTitle("Example Post Title Extra Super Looooooong")
    ).toThrowError(PostTitleIsTooLongError);
  });
});
