import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserUsernameIsTooLongError extends DomainError {
  constructor(username: string) {
    super(
      `Username: ${username} is too long`,
      DomainErrorCode.USERNAME_IS_TOO_LONG
    );
  }
}
