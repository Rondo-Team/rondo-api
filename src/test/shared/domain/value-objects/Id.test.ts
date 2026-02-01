import { describe, expect, it } from "vitest";
import { IdIsNotValidError } from "../../../../shared/domain/errors/IdIsNotValidError.ts";
import { Id } from "../../../../shared/domain/value-objects/Id.ts";

describe("Id tests", () => {
  it("should not throw error if id is long enough", () => {
    expect(() => new Id("123e4567-e89b-12d3-a456-426614174000")).not.toThrow();
  });

  it("should throw error if id is not long enough", () => {
    expect(() => new Id("1234")).toThrowError(IdIsNotValidError);
  });
});
