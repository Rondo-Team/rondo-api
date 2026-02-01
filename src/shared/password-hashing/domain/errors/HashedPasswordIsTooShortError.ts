import { DomainError } from "../../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../error-handling/domain/DomainErrorCode.ts";

export class HashedPasswordIsTooShortError extends DomainError {
  constructor() {
    super(
      "Hashed password is too short",
      DomainErrorCode.HASHED_PASSWORD_TOO_SHORT
    );
  }
}
