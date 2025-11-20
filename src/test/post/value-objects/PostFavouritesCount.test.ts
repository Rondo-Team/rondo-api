import { POST_FAVOURITES_UPPER_LIMIT } from "@/config";
import { PostFavouritesCount } from "@/post/domain/value-objects/PostFavouritesCount";
import { PostFavouritesCountIsInvalidError } from "@/post/domain/errors/PostFavouritesCountIsInvalidError";
import { describe, expect, it } from "vitest";

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
