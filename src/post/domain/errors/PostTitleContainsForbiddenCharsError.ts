import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostTitleContainsForbiddenCharsError extends DomainError {
  constructor() {
    super('Post title contanis forbidden chars', DomainErrorCode.POST_TITLE_HAS_FORBIDDEN_CHARS)
  }
}