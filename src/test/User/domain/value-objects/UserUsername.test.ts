import { UserUsernameIsInvalidError } from "@/User/domain/errors/UserUsernameIsInvalidError";
import { UserUsernameIsTooLongError } from "@/User/domain/errors/UserUserNameIsTooLongError";
import { UserUsernameIsTooShortError } from "@/User/domain/errors/UserUsernameIsTooShortError";
import { UserUsername } from "@/User/domain/value-objects/UserUsername";
import { describe, expect, it } from "vitest";

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
