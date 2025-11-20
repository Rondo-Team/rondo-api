import { UserNameContainsInvalidCharactersError } from "@/user/domain/errors/UserNameContainsInvalidCharactersError";
import { UserNameIsTooLongError } from "@/user/domain/errors/UserNameIsTooLongError";
import { UserNameIsTooShortError } from "@/user/domain/errors/UserNameIsTooShortError";
import { UserName } from "@/user/domain/value-objects/UserName";
import { describe, expect, it } from "vitest";

describe("Name tests", () => {
  it("does not fail if user name is valid", () => {
    expect(() => new UserName("saul")).not.toThrow();
  });

  it("throws an error if user name is not valid", () => {
    expect(() => new UserName("saul_goodman")).toThrowError(
      UserNameContainsInvalidCharactersError
    );
  });

  it("throws an error if user name is too short", () => {
    expect(() => new UserName("s")).toThrowError(UserNameIsTooShortError);
  });

  it("throws an error if user name is too long", () => {
    expect(
      () =>
        new UserName(
          "saulgoodmanwhalterwhiteskylerwhitemichaelhermantraudjessiepinkman"
        )
    ).toThrowError(UserNameIsTooLongError);
  });
});
