import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class IdIsNotValidError extends DomainError {
  constructor(id: string) {
    super(`Id: ${id} is not long enough, minimun length is 5 characters`, DomainErrorCode.ID_NOT_VALID)
  }
}