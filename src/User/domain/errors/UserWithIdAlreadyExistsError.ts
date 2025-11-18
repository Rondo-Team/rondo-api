import { DomainError } from "../../../shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode";

export class UserWithIdAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(`User with id: ${id} already exists`, DomainErrorCode.USER_WITH_ID_ALREADY_EXISTS)
  }
}