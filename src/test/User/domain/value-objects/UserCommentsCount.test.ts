import { describe, expect, it } from "vitest";
import { UPPER_COMMENTS_LIMIT } from "../../../../config/domain/Consts.ts";
import { CommentsCountInvalidError } from "../../../../user/domain/errors/CommentsCountInvalidError.ts";
import { UserCommentsCount } from "../../../../user/domain/value-objects/UserCommentsCount.ts";

describe("UserCommentsCount tests", () => {
  it("does not fail if user comments count is valid", () => {
    expect(() => new UserCommentsCount(7)).not.toThrow();
  });

  it("throws an error if user comments count is invalid (non integer number)", () => {
    expect(() => new UserCommentsCount(7.7)).toThrowError(
      CommentsCountInvalidError
    );
  });

  it("throws an error if user comments count is invalid (negative number)", () => {
    expect(() => new UserCommentsCount(-7)).toThrowError(
      CommentsCountInvalidError
    );
  });

  it("throws an error if user comments count is invalid (greateer than max)", () => {
    expect(() => new UserCommentsCount(UPPER_COMMENTS_LIMIT + 1)).toThrowError(
      CommentsCountInvalidError
    );
  });
});
