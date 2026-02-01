import { describe, expect, it } from "vitest";
import { POST_FAVOURITES_UPPER_LIMIT } from "../../../../config/domain/Consts.ts";
import { PostFavouritesCountIsInvalidError } from "../../../../post/domain/errors/PostFavouritesCountIsInvalidError.ts";
import { PostFavouritesCount } from "../../../../post/domain/value-objects/PostFavouritesCount.ts";

describe("Post Favourites count tests", () => {
  it("does not fail if posts Favourites count is valid", () => {
    expect(() => new PostFavouritesCount(7)).not.toThrow();
  });

  it("throws an error if posts Favourites count is invalid (non integer number)", () => {
    expect(() => new PostFavouritesCount(7.7)).toThrowError(
      PostFavouritesCountIsInvalidError
    );
  });

  it("throws an error if posts Favourites count is invalid (negative number)", () => {
    expect(() => new PostFavouritesCount(-7)).toThrowError(
      PostFavouritesCountIsInvalidError
    );
  });

  it("throws an error if posts Favourites count is invalid (greateer than max)", () => {
    expect(
      () => new PostFavouritesCount(POST_FAVOURITES_UPPER_LIMIT + 1)
    ).toThrowError(PostFavouritesCountIsInvalidError);
  });
});
