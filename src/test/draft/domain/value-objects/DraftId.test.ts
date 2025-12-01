import { DraftId } from "@/draft/domain/value-objects/DraftId";
import { IdIsNotValidError } from "@/shared/domain/errors/IdIsNotValidError";
import { describe, expect, it } from "vitest";

describe("Draft ID tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(
      () => new DraftId("123e4567-e89b-12d3-a456-426614174000")
    ).not.toThrow();
  });

  it("should not throw error if id is long enough", () => {
    expect(() => new DraftId("1234")).toThrowError(IdIsNotValidError);
  });
});
