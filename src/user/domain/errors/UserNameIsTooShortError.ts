import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserNameIsTooShortError extends DomainError {
  constructor(name: string) {
    super(`Name: ${name} is too short`, DomainErrorCode.USER_NAME_IS_TOO_SHORT);
  }
}
