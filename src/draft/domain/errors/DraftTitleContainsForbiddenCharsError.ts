import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftTitleContainsForbiddenCharsError extends DomainError {
  constructor() {
    super('Draft title contanis forbidden chars', DomainErrorCode.DRAFT_TITLE_HAS_FORBIDDEN_CHARS)
  }
}