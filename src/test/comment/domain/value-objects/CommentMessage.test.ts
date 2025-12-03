import { describe, expect, it } from "vitest";
import { CommentMessageContainsForbiddenCharsError } from "../../../../comment/domain/errors/CommentMessageContainsForbiddenCharsError.ts";
import { CommentMessageHasTooManyNewLinesError } from "../../../../comment/domain/errors/CommentMessageHasTooManyNewLinesError.ts";
import { CommentMessageIsEmptyError } from "../../../../comment/domain/errors/CommentMessageIsEmptyError.ts";
import { CommentMessageIsTooLongError } from "../../../../comment/domain/errors/CommentMessageIsTooLongError.ts";
import { CommentMessageIsTooShortError } from "../../../../comment/domain/errors/CommentMessageIsToShortError.ts";
import { CommentMessage } from "../../../../comment/domain/value-objects/CommentMessage.ts";
import { POST_DESCRIPTION_MAX_NEW_LINES } from "../../../../config/domain/Consts.ts";

describe("Comment message tests", () => {
  it("does not fail if comment message is valid", () => {
    expect(() => new CommentMessage("Example comment message")).not.toThrow();
  });

  it("throws an error if comment message is too short", () => {
    expect(() => new CommentMessage("")).toThrowError(
      CommentMessageIsTooShortError
    );
  });

  it("throws an error if comment message is too long", () => {
    expect(() => new CommentMessage("example".repeat(100))).toThrowError(
      CommentMessageIsTooLongError
    );
  });

  it("throws an error if comment message is empty", () => {
    expect(() => new CommentMessage("                   ")).toThrowError(
      CommentMessageIsEmptyError
    );
  });

  it("throws an error if comment message contains invalid chars", () => {
    expect(() => new CommentMessage("Example\x01description")).toThrowError(
      CommentMessageContainsForbiddenCharsError
    );
  });

  it("throws an error if comment message has many new Lines", () => {
    expect(
      () =>
        new CommentMessage("line1\n".repeat(POST_DESCRIPTION_MAX_NEW_LINES + 1))
    ).toThrowError(CommentMessageHasTooManyNewLinesError);
  });
});
