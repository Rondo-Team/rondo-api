import { describe, expect, it } from "vitest";
import { PostTagIsInvalidError } from "../../../../post/domain/errors/PostTagIsInvalidError.ts";
import { PostTagsListHasRepeatedElementsError } from "../../../../post/domain/errors/PostTagsListHasRepeatedElementsError.ts";
import { PostTagsListIsTooLongError } from "../../../../post/domain/errors/PostTagsListIsTooLongError.ts";
import { PostTags } from "../../../../post/domain/value-objects/PostTags.ts";

describe("Post tags tests", () => {
  it("does not fail if post tags are valid", () => {
    expect(() => new PostTags(["Defensive"])).not.toThrow();
  });

  it("throws an error if post tags list is too long", () => {
    expect(() => new PostTags(Array(35).fill("Defensive"))).toThrowError(
      PostTagsListIsTooLongError
    );
  });

  it("throws an error if post tags are invalid", () => {
    expect(() => new PostTags(["InvalidTag_:"])).toThrowError(
      PostTagIsInvalidError
    );
  });

  it("throws an error if post tags are repeated", () => {
    expect(() => new PostTags(["RepeatedTag", "RepeatedTag"])).toThrowError(
      PostTagsListHasRepeatedElementsError
    );
  });
});
