import { CreationDateInvalidError } from "@/shared/domain/errors/CreationDateInvalidError";
import { CreatedAt } from "@/shared/domain/value-objects/CreatedAt";
import { describe, expect, it } from "vitest";

describe("User created at tests", () => {
  it("does not fail if creation date is valid", () => {
    expect(() => new CreatedAt(new Date("01/01/2000"))).not.toThrow();
  });

  it("throws an error if creation date is not valid", () => {
    expect(() => new CreatedAt(new Date("01/01/3000"))).toThrowError(
      CreationDateInvalidError
    );
  });
});
