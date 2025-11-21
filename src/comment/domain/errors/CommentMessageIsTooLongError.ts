import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentMessageIsTooLongError extends DomainError {
  constructor() {
    super('Comment message is too long', DomainErrorCode.COMMENT_MESSAGE_TOO_LONG)
  }
}