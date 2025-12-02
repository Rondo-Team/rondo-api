import { CommentFavouritesCountIsInvalidError } from "@/comment/domain/errors/CommentFavouritesCountIsInvalidError";
import { CommentFavouritesCount } from "@/comment/domain/value-objects/CommentFavouritesCount";
import { COMMENT_FAVOURITES_UPPER_LIMIT } from "@/config/domain/Consts";
import { describe, expect, it } from "vitest";

describe("Comment favourites count tests", () => {
  it("does not fail if count is valid", () => {
    expect(() => new CommentFavouritesCount(7)).not.toThrow();
  });

  it("throws an error if count is invalid (non integer number)", () => {
    expect(() => new CommentFavouritesCount(7.7)).toThrowError(
      CommentFavouritesCountIsInvalidError
    );
  });

  it("throws an error if count is invalid (negative number)", () => {
    expect(() => new CommentFavouritesCount(-7)).toThrowError(
      CommentFavouritesCountIsInvalidError
    );
  });

  it("throws an error if count is invalid (greateer than max)", () => {
    expect(
      () => new CommentFavouritesCount(COMMENT_FAVOURITES_UPPER_LIMIT + 1)
    ).toThrowError(CommentFavouritesCountIsInvalidError);
  });
});
