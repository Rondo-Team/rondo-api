import { ProfilePictureIsInvalidError } from "@/user/domain/errors/ProfilePictureIsInvalidError";

export class UserProfilePicture {
  constructor(readonly value: string) {
    this.ensureIsValid();
  }

  private ensureIsValid() {
    const regex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (!regex.test(this.value))
      throw new ProfilePictureIsInvalidError(this.value);
  }
}
