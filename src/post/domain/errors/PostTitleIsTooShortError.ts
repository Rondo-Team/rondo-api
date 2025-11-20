import { DomainError } from "@/shared/error-handling/domain/DomainError"
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode"

export class PostTitleIsTooShortError extends DomainError {
  constructor(title: string) {
    super(`Post title: ${title} is too short`, DomainErrorCode.POST_TITLE_TOO_SHORT)
  }
}