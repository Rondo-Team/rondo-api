import { DomainError } from "../../../shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode";

export class UserNameContainsInvalidCharactersError extends DomainError {
  constructor(name: string) {
    super(`Name: ${name} is too short`, DomainErrorCode.USER_NAME_CONTAINS_INVALID_CHARACTERS);
  }
}