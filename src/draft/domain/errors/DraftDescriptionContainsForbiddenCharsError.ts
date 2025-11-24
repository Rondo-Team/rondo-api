import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftDescriptionContainsForbiddenCharsError extends DomainError {
  constructor() {
    super('Draft description contanis forbidden chars', DomainErrorCode.DRAFT_DESCRIPTION_HAS_FORBIDDEN_CHARS)
  }
}