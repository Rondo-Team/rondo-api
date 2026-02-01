import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserUsernameChangeDateInvalidError extends DomainError {
  constructor(value: Date) {
    super(`The username modification date: ${value} is invalid`, DomainErrorCode.USER_USERNAME_CHANGE_DATE_INVALID)
  }
}