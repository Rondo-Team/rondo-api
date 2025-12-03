import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserUsernameIsTooShortError extends DomainError {
  constructor(username: string) {
    super(
      `Username: ${username} is too short`,
      DomainErrorCode.USERNAME_IS_TOO_SHORT
    );
  }
}
