import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftTitleHasTooManyNewLinesError extends DomainError {
  constructor() {
    super('Draft title has too many new lines', DomainErrorCode.DRAFT_TITLE_HAS_TOO_MANY_NEW_LINES)
  }
}