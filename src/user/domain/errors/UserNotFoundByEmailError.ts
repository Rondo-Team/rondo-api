import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserNotFoundByEmailError extends DomainError {
  constructor(email: string) {
    super(
      `User with email: ${email} not found`,
      DomainErrorCode.USER_NOT_FOUND_BY_EMAIL
    );
  }
}
