import { DRAFT_TITLE_MAX_NEW_LINES } from "@/config/domain/Consts";
import { DraftTitleContainsForbiddenCharsError } from "@/draft/domain/errors/DraftTitleContainsForbiddenCharsError";
import { DraftTitleHasTooManyNewLinesError } from "@/draft/domain/errors/DraftTitleHasTooManyNewLinesError";
import { DraftTitleIsEmptyError } from "@/draft/domain/errors/DraftTitleIsEmptyError";
import { DraftTitleIsTooLongError } from "@/draft/domain/errors/DraftTitleIsTooLongError";
import { DraftTitleIsTooShortError } from "@/draft/domain/errors/DraftTitleIsTooShortError";
import { DraftTitle } from "@/draft/domain/value-objects/DraftTitle";
import { describe, expect, it } from "vitest";

describe("Draft title tests", () => {
  it("does not fail if draft title is valid", () => {
    expect(() => new DraftTitle("Example Draft Title")).not.toThrow();
  });

  it("throws an error if draft title is too short", () => {
    expect(() => new DraftTitle("Ex")).toThrowError(DraftTitleIsTooShortError);
  });

  it("throws an error if draft title is too long", () => {
    expect(
      () => new DraftTitle("Draft Post Title Extra Super Looooooong")
    ).toThrowError(DraftTitleIsTooLongError);
  });

  it("throws an error if title is empty", () => {
    expect(() => new DraftTitle("    ")).toThrowError(DraftTitleIsEmptyError);
  });

  it("throws an error if title contains invalid chars", () => {
    expect(() => new DraftTitle("Example\x01title")).toThrowError(
      DraftTitleContainsForbiddenCharsError
    );
  });

  it("throws an error if title has many new Lines", () => {
    expect(
      () => new DraftTitle("line1\n".repeat(DRAFT_TITLE_MAX_NEW_LINES + 1))
    ).toThrowError(DraftTitleHasTooManyNewLinesError);
  });
});
