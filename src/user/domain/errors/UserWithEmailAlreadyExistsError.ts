import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserWithEmailAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(
      `User with email: ${email} already exists`,
      DomainErrorCode.USER_WITH_EMAIL_ALREADY_EXISTS
    );
  }
}
