import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class CommentReplyRefersToDifferentPostError extends DomainError {
  constructor(commentId: string, postId: string) {
    super(
      `The comment reply with id ${commentId} refers to post ${postId} but its parent comment differs.`,
      DomainErrorCode.COMMENT_REPLY_REFERS_TO_DIFFERENT_POST
    );
  }
}
