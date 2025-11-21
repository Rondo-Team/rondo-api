import { DomainError } from "@/shared/error-handling/domain/DomainError"
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode"

export class DraftDescriptionIsTooLongError extends DomainError {
  constructor() {
    super(`Draft description is too long`, DomainErrorCode.DRAFT_DESCRIPTION_TOO_LONG)
  }
}