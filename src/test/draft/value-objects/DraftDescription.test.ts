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
});
