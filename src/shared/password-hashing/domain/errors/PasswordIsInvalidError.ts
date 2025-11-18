import { DomainError } from "../../../error-handling/domain/DomainError";
import { DomainErrorCode } from "../../../error-handling/domain/DomainErrorCode";

export class PasswordIsInvalidError extends DomainError {
  constructor() {
    super(
      "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character",
      DomainErrorCode.PASSWORD_IS_INVALID
    );
  }
}
