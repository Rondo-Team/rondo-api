import { UserNameContainsInvalidCharactersError } from "@/User/domain/errors/UserNameContainsInvalidCharactersError";
import { UserNameIsTooLongError } from "@/User/domain/errors/UserNameIsTooLongError";
import { UserNameIsTooShortError } from "@/User/domain/errors/UserNameIsTooShortError";
import { UserName } from "@/User/domain/value-objects/UserName";
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
