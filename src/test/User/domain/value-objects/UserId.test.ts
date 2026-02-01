import { describe, expect, it } from "vitest";
import { IdIsNotValidError } from "../../../../shared/domain/errors/IdIsNotValidError.ts";
import { UserId } from "../../../../user/domain/value-objects/UserId.ts";

describe("UserId tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(
      () => new UserId("123e4567-e89b-12d3-a456-426614174000")
    ).not.toThrow();
  });

  it("should not throw error if id is long enough", () => {
    expect(() => new UserId("1234")).toThrowError(IdIsNotValidError);
  });
});
