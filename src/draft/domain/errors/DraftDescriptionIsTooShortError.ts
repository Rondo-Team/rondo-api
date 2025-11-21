import { DomainError } from "@/shared/error-handling/domain/DomainError"
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode"

export class DraftDescriptionIsTooShortError extends DomainError {
  constructor() {
    super(`Draft description is too short`, DomainErrorCode.DRAFT_DESCRIPTION_TOO_SHORT)
  }
}