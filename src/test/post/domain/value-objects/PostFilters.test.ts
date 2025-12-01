import { SEARCH_POSTS_MIN_FAVOURITES_UPPER_LIMIT, SEARCH_POSTS_TAGS_UPPER_LIMIT } from "@/config";
import { PostFilterCreationDateInvalidError } from "@/post/domain/errors/PostFilterCreationDateInvalidError";
import { PostFilterMinFavouritesIsIvalidError } from "@/post/domain/errors/PostFilterMinFavouritesIsIvalidError";
import { PostFilterTagIsInvalidError } from "@/post/domain/errors/PostFilterTagIsInvalidError";
import { PostFilterTagsListHasRepeatedElementsError } from "@/post/domain/errors/PostFilterTagsListHasRepeatedElementsError";
import { PostFilterTagsListIsTooLongError } from "@/post/domain/errors/PostFilterTagsListIsTooLongError";
import { PostFilters } from "@/post/domain/value-objects/PostFilters";
import { describe, expect, it } from "vitest";

describe("Post Filters tests", () => {
  it("does not fail if inputs are valid", () => {
    expect(() => new PostFilters({
      tags: ["433", "pressure"],
      minCreationDate: new Date("2023-01-01"),
      minFavourites: 3
    })).not.toThrow();
  });

  it("does not fail if tags are valid", () => {
    expect(() => new PostFilters({
      tags: ["433", "pressure"],
    })).not.toThrow();
  });

  it("throws an error if number of tags is too long", () => {
    expect(() => new PostFilters({
      tags: Array(SEARCH_POSTS_TAGS_UPPER_LIMIT + 1).fill("pressure"),
    })).toThrowError(
      PostFilterTagsListIsTooLongError
    );
  });

  it("throws an error if search post tags are invalid", () => {
    expect(() => new PostFilters({
      tags: ["InvalidTag_:"],
    })).toThrowError(
      PostFilterTagIsInvalidError
    );
  });

  it("throws an error if search post tags are repeated", () => {
    expect(() => new PostFilters({
      tags: ["Repeated", "Repeated"],
    })).toThrowError(
      PostFilterTagsListHasRepeatedElementsError
    );
  });

  it("does not fail if search post min favourites is valid", () => {
    expect(() => new PostFilters({
      minFavourites: 2,
    })).not.toThrow();
  });

  it("throws an error if search post min Favourites is invalid (non integer number)", () => {
    expect(() => new PostFilters({
      minFavourites: 7.7
    })).toThrowError(
      PostFilterMinFavouritesIsIvalidError
    );
  });

  it("throws an error if search posts min Favourites is invalid (negative number)", () => {
    expect(() => new PostFilters({
      minFavourites: -7
    })).toThrowError(
      PostFilterMinFavouritesIsIvalidError
    );
  });

  it("throws an error if search posts min Favourites is invalid (greateer than max)", () => {
    expect(() => new PostFilters({
      minFavourites: SEARCH_POSTS_MIN_FAVOURITES_UPPER_LIMIT + 1
    })).toThrowError(
      PostFilterMinFavouritesIsIvalidError
    );
  });

  it("should throw if minCreationDate is in the future", () => {
    const future = new Date(Date.now() + 1000 * 60);
    expect(
      () =>
        new PostFilters({
          minCreationDate: future
        })
    ).toThrowError(PostFilterCreationDateInvalidError);
  });

  it("should not throw if minCreationDate is valid", () => {
    expect(
      () =>
        new PostFilters({
          minCreationDate: new Date("2020-01-01")
        })
    ).not.toThrow();
  });
});