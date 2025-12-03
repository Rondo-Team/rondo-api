import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class IncorrectPasswordError extends DomainError {
  constructor() {
    super(`Password is incorrect`, DomainErrorCode.INCORRECT_PASSWORD);
  }
}
