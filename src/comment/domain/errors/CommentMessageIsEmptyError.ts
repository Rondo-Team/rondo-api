import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class CommentMessageIsEmptyError extends DomainError {
  constructor() {
    super("Comment message is empty", DomainErrorCode.COMMENT_MESSAGE_IS_EMPTY);
  }
}
