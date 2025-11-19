import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UserUsernameIsInvalidError extends DomainError {
  constructor(username: string) {
    super(
      `Username: ${username} is invalid, it only can contain letters, numbers, dots and underscores`,
      DomainErrorCode.USERNAME_IS_INVALID
    );
  }
}
