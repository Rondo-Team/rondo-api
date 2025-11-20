import { UserCreationDateInvalidError } from "@/user/domain/errors/UserCreationDateInvalidError";
import { UserCreatedAt } from "@/user/domain/value-objects/UserCreatedAt";
import { describe, expect, it } from "vitest";

describe("User created at tests", () => {
  it("does not fail if creation date is valid", () => {
    expect(() => new UserCreatedAt(new Date("01/01/2000"))).not.toThrow();
  });

  it("throws an error if creation date is not valid", () => {
    expect(() => new UserCreatedAt(new Date("01/01/3000"))).toThrowError(
      UserCreationDateInvalidError
    );
  });
});
