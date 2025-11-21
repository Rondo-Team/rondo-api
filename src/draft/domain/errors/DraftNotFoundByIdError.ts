import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftNotFoundByIdError extends DomainError{
  constructor(id: string) {
    super(`Draft with id: ${id} was not found`, DomainErrorCode.DRAFT_NOT_FOUND)
  }
}