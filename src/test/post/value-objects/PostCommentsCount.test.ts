import { POST_COMMENTS_UPPER_LIMIT } from "@/config";
import { PostCommentsCount } from "@/post/domain/value-objects/PostCommentsCount";
import { PostCommentsCountIsInvalidError } from "@/post/domain/errors/PostCommentsCountIsInvalidError";
import { describe, expect, it } from "vitest";

describe("Post Comments count tests", () => {
  it("does not fail if posts Comments count is valid", () => {
    expect(() => new PostCommentsCount(7)).not.toThrow();
  });

  it("throws an error if posts Comments count is invalid (non integer number)", () => {
    expect(() => new PostCommentsCount(7.7)).toThrowError(
      PostCommentsCountIsInvalidError
    );
  });

  it("throws an error if posts Comments count is invalid (negative number)", () => {
    expect(() => new PostCommentsCount(-7)).toThrowError(
      PostCommentsCountIsInvalidError
    );
  });

  it("throws an error if posts Comments count is invalid (greateer than max)", () => {
    expect(
      () => new PostCommentsCount(POST_COMMENTS_UPPER_LIMIT + 1)
    ).toThrowError(PostCommentsCountIsInvalidError);
  });
});