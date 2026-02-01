import { describe, expect, it } from "vitest";
import { POST_DESCRIPTION_MAX_NEW_LINES } from "../../../../config/domain/Consts.ts";
import { PostDescriptionContainsForbiddenCharsError } from "../../../../post/domain/errors/PostDescriptionContainsForbiddenCharsError.ts";
import { PostDescriptionHasTooManyNewLinesError } from "../../../../post/domain/errors/PostDescriptionHasTooManyNewLinesError.ts";
import { PostDescriptionIsEmptyError } from "../../../../post/domain/errors/PostDescriptionIsEmptyError.ts";
import { PostDescriptionIsTooLongError } from "../../../../post/domain/errors/PostDescriptionIsTooLongError.ts";
import { PostDescriptionIsTooShortError } from "../../../../post/domain/errors/PostDescriptionIsTooShortError.ts";
import { PostDescription } from "../../../../post/domain/value-objects/PostDescription.ts";

describe("Post description tests", () => {
  it("does not fail if post description is valid", () => {
    expect(() => new PostDescription("Example Post Description")).not.toThrow();
  });

  it("throws an error if post description is too short", () => {
    expect(() => new PostDescription("Exam")).toThrowError(
      PostDescriptionIsTooShortError
    );
  });

  it("throws an error if post description is too long", () => {
    expect(() => new PostDescription("example".repeat(100))).toThrowError(
      PostDescriptionIsTooLongError
    );
  });

  it("throws an error if description is empty", () => {
    expect(() => new PostDescription("                   ")).toThrowError(
      PostDescriptionIsEmptyError
    );
  });

  it("throws an error if descriprtion contains invalid chars", () => {
    expect(() => new PostDescription("Example\x01description")).toThrowError(
      PostDescriptionContainsForbiddenCharsError
    );
  });

  it("throws an error if description has many new Lines", () => {
    expect(
      () =>
        new PostDescription(
          "line1\n".repeat(POST_DESCRIPTION_MAX_NEW_LINES + 1)
        )
    ).toThrowError(PostDescriptionHasTooManyNewLinesError);
  });
});
