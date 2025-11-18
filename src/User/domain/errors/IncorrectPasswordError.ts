import { DomainError } from "../../../shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode";

export class IncorrectPasswordError extends DomainError {
  constructor() {
    super(`Password is incorrect`, DomainErrorCode.INCORRECT_PASSWORD)
  }
}