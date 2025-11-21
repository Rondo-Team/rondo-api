import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentMessageContainsForbiddenCharsError extends DomainError {
  constructor() {
    super('Comment message contanis forbidden chars', DomainErrorCode.COMMENT_MESSAGE_HAS_FORBIDDEN_CHARS)
  }
}