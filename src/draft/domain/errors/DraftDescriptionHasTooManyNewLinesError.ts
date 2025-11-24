import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftDescriptionHasTooManyNewLinesError extends DomainError {
  constructor() {
    super('Draft description has too many new lines', DomainErrorCode.DRAFT_DESCRIPTION_HAS_TOO_MANY_NEW_LINES)
  }
}