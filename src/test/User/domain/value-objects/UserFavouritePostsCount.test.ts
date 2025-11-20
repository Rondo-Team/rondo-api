import { UPPER_FAVOURITES_LIMIT } from "@/config";
import { FavouritesCountInvalidError } from "@/user/domain/errors/FavouritesCountInvalidError";
import { UserFavouritePostsCount } from "@/user/domain/value-objects/UserFavouritePostsCount";
import { describe, expect, it } from "vitest";

describe("UserFavouritePostsCount tests", () => {
  it("does not fail if user FavouritePosts count is valid", () => {
    expect(() => new UserFavouritePostsCount(7)).not.toThrow();
  });

  it("throws an error if user FavouritePosts count is invalid (non integer number)", () => {
    expect(() => new UserFavouritePostsCount(7.7)).toThrowError(
      FavouritesCountInvalidError
    );
  });

  it("throws an error if user FavouritePosts count is invalid (negative number)", () => {
    expect(() => new UserFavouritePostsCount(-7)).toThrowError(
      FavouritesCountInvalidError
    );
  });

  it("throws an error if user FavouritePosts count is invalid (greateer than max)", () => {
    expect(
      () => new UserFavouritePostsCount(UPPER_FAVOURITES_LIMIT + 1)
    ).toThrowError(FavouritesCountInvalidError);
  });
});
