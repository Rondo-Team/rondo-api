import { PostTagIsInvalidError } from "@/post/domain/errors/PostTagIsInvalidError";
import { PostTagsListHasRepeatedElementsError } from "@/post/domain/errors/PostTagsListHasRepeatedElementsError";
import { PostTagsListIsTooLongError } from "@/post/domain/errors/PostTagsListIsTooLongError";
import { PostTags } from "@/post/domain/value-objects/PostTags";
import { describe, expect, it } from "vitest";

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
