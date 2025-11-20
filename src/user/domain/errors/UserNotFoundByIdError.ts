import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UserNotFoundByIdError extends DomainError {
  constructor(id: string) {
    super(`User with id: ${id} not found`, DomainErrorCode.USER_NOT_FOUND_BY_ID)
  }
}