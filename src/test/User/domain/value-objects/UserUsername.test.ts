import { describe, expect, it } from "vitest";
import { UserUsernameIsInvalidError } from "../../../../user/domain/errors/UserUsernameIsInvalidError.ts";
import { UserUsernameIsTooLongError } from "../../../../user/domain/errors/UserUserNameIsTooLongError.ts";
import { UserUsernameIsTooShortError } from "../../../../user/domain/errors/UserUsernameIsTooShortError.ts";
import { UserUsername } from "../../../../user/domain/value-objects/UserUsername.ts";

describe("UserUsername tests", () => {
  it("does not fail if username is valid", () => {
    expect(() => new UserUsername("saulgoodman")).not.toThrow();
  });

  it("throws an error if username is not valid", () => {
    expect(() => new UserUsername("saul-goodman")).toThrowError(
      UserUsernameIsInvalidError
    );
  });

  it("throws an error if username is too short", () => {
    expect(() => new UserUsername("sa")).toThrowError(
      UserUsernameIsTooShortError
    );
  });

  it("throws an error if username is too long", () => {
    expect(() => new UserUsername("saulgoodmanwhalterwhite")).toThrowError(
      UserUsernameIsTooLongError
    );
  });
});
