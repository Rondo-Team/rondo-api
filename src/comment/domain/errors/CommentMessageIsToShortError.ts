import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentMessageIsTooShortError extends DomainError {
  constructor() {
    super('Comment message is too short', DomainErrorCode.COMMENT_MESSAGE_TOO_SHORT)
  }
}