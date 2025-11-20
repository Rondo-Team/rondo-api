import { IdIsNotValidError } from "@/shared/error-handling/domain/errors/IdIsNotValidError";
import { UserId } from "@/user/domain/value-objects/UserId";
import { describe, expect, it } from "vitest";

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
