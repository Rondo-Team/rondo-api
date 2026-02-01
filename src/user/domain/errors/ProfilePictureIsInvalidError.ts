import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProfilePictureIsInvalidError extends DomainError {
  constructor(profilePicture: string) {
    super(
      `Profile picture: ${profilePicture} is not a valid URl`,
      DomainErrorCode.PROFILE_PICTURE_IS_INVALID
    );
  }
}
