import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProfilePictureIsInvalidError extends DomainError {
  constructor(profilePicture: string) {
    super(`Profile picture: ${profilePicture} is not a valid URl`, DomainErrorCode.PROFILE_PICTURE_IS_INVALID)
  }
}