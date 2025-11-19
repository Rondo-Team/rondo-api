import { UPPER_COMMENTS_LIMIT } from "@/config";
import { CommentsCountInvalidError } from "@/User/domain/errors/CommentsCountInvalidError";
import { UserCommentsCount } from "@/User/domain/value-objects/UserCommentsCount";
import { describe, expect, it } from "vitest";

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