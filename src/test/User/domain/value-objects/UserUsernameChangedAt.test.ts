import { describe, expect, it } from "vitest";
import { UserUsernameChangeDateInvalidError } from "../../../../user/domain/errors/UserUsernameChangeDateInvalidError.ts";
import { UserUsernameChangedAt } from "../../../../user/domain/value-objects/UserUsernameChangedAt.ts";

describe("User changed username at tests", () => {
  it("does not fail if changing date is valid", () => {
    expect(
      () => new UserUsernameChangedAt(new Date("01/01/2000"))
    ).not.toThrow();
  });

  it("throws an error if changing date is not valid", () => {
    expect(
      () => new UserUsernameChangedAt(new Date("01/01/3000"))
    ).toThrowError(UserUsernameChangeDateInvalidError);
  });
});
