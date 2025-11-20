import { UPPER_POSTS_LIMIT } from "@/config";
import { PostsCountInvalidError } from "@/user/domain/errors/PostsCountInvalidError";
import { UserPostsCount } from "@/user/domain/value-objects/UserPostsCount";
import { describe, expect, it } from "vitest";

describe("UserPostsCount tests", () => {
  it("does not fail if user posts count is valid", () => {
    expect(() => new UserPostsCount(7)).not.toThrow();
  });

  it("throws an error if user posts count is invalid (non integer number)", () => {
    expect(() => new UserPostsCount(7.7)).toThrowError(PostsCountInvalidError);
  });

  it("throws an error if user posts count is invalid (negative number)", () => {
    expect(() => new UserPostsCount(-7)).toThrowError(PostsCountInvalidError);
  });

  it("throws an error if user posts count is invalid (greateer than max)", () => {
    expect(() => new UserPostsCount(UPPER_POSTS_LIMIT + 1)).toThrowError(
      PostsCountInvalidError
    );
  });
});
