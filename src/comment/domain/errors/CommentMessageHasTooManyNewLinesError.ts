import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class CommentMessageHasTooManyNewLinesError extends DomainError {
  constructor() {
    super(
      "Comment message has too many new lines",
      DomainErrorCode.COMMENT_MESSAGE_HAS_TOO_MANY_NEW_LINES
    );
  }
}
