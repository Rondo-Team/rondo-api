import { DomainError } from "@/shared/error-handling/domain/DomainError"
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode"

export class PostDescriptionIsTooLongError extends DomainError {
  constructor() {
    super(`Post description is too long`, DomainErrorCode.POST_DESCRIPTION_TOO_LONG)
  }
}