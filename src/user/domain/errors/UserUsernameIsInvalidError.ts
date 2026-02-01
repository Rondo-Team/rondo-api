import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserUsernameIsInvalidError extends DomainError {
  constructor(username: string) {
    super(
      `Username: ${username} is invalid, it only can contain letters, numbers, dots and underscores`,
      DomainErrorCode.USERNAME_IS_INVALID
    );
  }
}
