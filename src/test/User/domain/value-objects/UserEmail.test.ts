import { describe, expect, it } from "vitest";
import { UserEmailIsInvalidError } from "../../../../user/domain/errors/UserEmailIsInvalidError.ts";
import { UserEmail } from "../../../../user/domain/value-objects/UserEmail.ts";

describe("User email tests", () => {
  it("does not fail if user email is valid", () => {
    expect(() => new UserEmail("saul@goodman.com")).not.toThrow();
  });

  it("throws an error if user email is not valid", () => {
    expect(() => new UserEmail("saulgoodman")).toThrowError(
      UserEmailIsInvalidError
    );
  });
});
