import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftWithIdAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(`Draft with id: ${id} already exists`, DomainErrorCode.DRAFT_WITH_ID_ALREADY_EXISTS)
  }
}