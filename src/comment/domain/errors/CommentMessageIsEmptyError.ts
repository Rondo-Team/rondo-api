import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentMessageIsEmptyError extends DomainError {
  constructor() {
    super('Comment message is empty', DomainErrorCode.COMMENT_MESSAGE_IS_EMPTY)
  }
}