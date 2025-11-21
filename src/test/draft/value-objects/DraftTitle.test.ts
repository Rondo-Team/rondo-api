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
});
