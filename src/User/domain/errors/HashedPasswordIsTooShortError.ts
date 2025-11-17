import { DomainError } from "../../../shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode";

export class HashedPasswordIsTooShortError extends DomainError {
  constructor() {
    super('Hashed password is too short', DomainErrorCode.HASHED_PASSWORD_TOO_SHORT)
  }
}