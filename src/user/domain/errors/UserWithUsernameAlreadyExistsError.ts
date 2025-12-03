import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserWithUsernameAlreadyExistsError extends DomainError {
  constructor(username: string) {
    super(
      `User with username: ${username} already exists`,
      DomainErrorCode.USER_WITH_USERNAME_ALREADY_EXISTS
    );
  }
}
