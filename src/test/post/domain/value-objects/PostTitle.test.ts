import { describe, expect, it } from "vitest";
import { POST_TITLE_MAX_NEW_LINES } from "../../../../config/domain/Consts.ts";
import { PostTitleContainsForbiddenCharsError } from "../../../../post/domain/errors/PostTitleContainsForbiddenCharsError.ts";
import { PostTitleHasTooManyNewLinesError } from "../../../../post/domain/errors/PostTitleHasTooManyNewLinesError.ts";
import { PostTitleIsEmptyError } from "../../../../post/domain/errors/PostTitleIsEmptyError.ts";
import { PostTitleIsTooLongError } from "../../../../post/domain/errors/PostTitleIsTooLongError.ts";
import { PostTitleIsTooShortError } from "../../../../post/domain/errors/PostTitleIsTooShortError.ts";
import { PostTitle } from "../../../../post/domain/value-objects/PostTitle.ts";

describe("Post title tests", () => {
  it("does not fail if post title is valid", () => {
    expect(() => new PostTitle("Example Post Title")).not.toThrow();
  });

  it("throws an error if post title is too short", () => {
    expect(() => new PostTitle("Ex")).toThrowError(PostTitleIsTooShortError);
  });

  it("throws an error if post title is too long", () => {
    expect(
      () => new PostTitle("Example Post Title Extra Super Looooooong")
    ).toThrowError(PostTitleIsTooLongError);
  });

  it("throws an error if title is empty", () => {
    expect(() => new PostTitle("    ")).toThrowError(PostTitleIsEmptyError);
  });

  it("throws an error if title contains invalid chars", () => {
    expect(() => new PostTitle("Example\x01title")).toThrowError(
      PostTitleContainsForbiddenCharsError
    );
  });

  it("throws an error if title has many new Lines", () => {
    expect(
      () => new PostTitle("line1\n".repeat(POST_TITLE_MAX_NEW_LINES + 1))
    ).toThrowError(PostTitleHasTooManyNewLinesError);
  });
});
