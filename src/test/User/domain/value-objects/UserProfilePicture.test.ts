import { ProfilePictureIsInvalidError } from "@/User/domain/errors/ProfilePictureIsInvalidError";
import { UserProfilePicture } from "@/User/domain/value-objects/UserProfilePicture";
import { describe, expect, it } from "vitest";

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
