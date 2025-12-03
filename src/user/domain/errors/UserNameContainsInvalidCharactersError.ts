import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserNameContainsInvalidCharactersError extends DomainError {
  constructor(name: string) {
    super(
      `Name: ${name} is too short`,
      DomainErrorCode.USER_NAME_CONTAINS_INVALID_CHARACTERS
    );
  }
}
