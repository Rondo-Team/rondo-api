import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class CommentMessageIsTooLongError extends DomainError {
  constructor() {
    super(
      "Comment message is too long",
      DomainErrorCode.COMMENT_MESSAGE_TOO_LONG
    );
  }
}
