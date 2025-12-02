import { DRAFT_DESCRIPTION_MAX_NEW_LINES } from "@/config/domain/Consts";
import { DraftDescriptionContainsForbiddenCharsError } from "@/draft/domain/errors/DraftDescriptionContainsForbiddenCharsError";
import { DraftDescriptionHasTooManyNewLinesError } from "@/draft/domain/errors/DraftDescriptionHasTooManyNewLinesError";
import { DraftDescriptionIsEmptyError } from "@/draft/domain/errors/DraftDescriptionIsEmptyError";
import { DraftDescriptionIsTooLongError } from "@/draft/domain/errors/DraftDescriptionIsTooLongError";
import { DraftDescription } from "@/draft/domain/value-objects/DraftDescription";
import { describe, expect, it } from "vitest";

describe("Draft description tests", () => {
  it("does not fail if Draft description is valid", () => {
    expect(
      () => new DraftDescription("Example Draft Description")
    ).not.toThrow();
  });

  it("does not throws an error if draft description is empty", () => {
    expect(() => new DraftDescription("Exam")).not.toThrow();
  });

  it("throws an error if post description is too long", () => {
    expect(() => new DraftDescription("example".repeat(100))).toThrowError(
      DraftDescriptionIsTooLongError
    );
  });

  it("throws an error if description is empty", () => {
    expect(() => new DraftDescription("                   ")).toThrowError(
      DraftDescriptionIsEmptyError
    );
  });

  it("throws an error if descriprtion contains invalid chars", () => {
    expect(() => new DraftDescription("Example\x01description")).toThrowError(
      DraftDescriptionContainsForbiddenCharsError
    );
  });

  it("throws an error if description has many new Lines", () => {
    expect(
      () =>
        new DraftDescription(
          "line1\n".repeat(DRAFT_DESCRIPTION_MAX_NEW_LINES + 1)
        )
    ).toThrowError(DraftDescriptionHasTooManyNewLinesError);
  });
});
