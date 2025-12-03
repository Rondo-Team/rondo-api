import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class CommentMessageIsTooShortError extends DomainError {
  constructor() {
    super(
      "Comment message is too short",
      DomainErrorCode.COMMENT_MESSAGE_TOO_SHORT
    );
  }
}
