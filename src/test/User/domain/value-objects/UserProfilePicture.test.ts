import { describe, expect, it } from "vitest";
import { ProfilePictureIsInvalidError } from "../../../../user/domain/errors/ProfilePictureIsInvalidError.ts";
import { UserProfilePicture } from "../../../../user/domain/value-objects/UserProfilePicture.ts";

describe("UserProfilePicture tests", () => {
  it("does not fail if user profile picture is valid", () => {
    expect(
      () =>
        new UserProfilePicture(
          "https://res.cloudinary.com/demo/image/upload/sample.jpg"
        )
    ).not.toThrow();
  });

  it("throws an error if username is not valid", () => {
    expect(
      () =>
        new UserProfilePicture(
          "(fail)https://res.cloudinary.com/demo/image/upload/sample.jpg"
        )
    ).toThrowError(ProfilePictureIsInvalidError);
  });
});
