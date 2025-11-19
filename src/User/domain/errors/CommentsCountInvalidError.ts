import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";
import { UPPER_COMMENTS_LIMIT } from "@/config";

export class CommentsCountInvalidError extends DomainError {
  constructor(count: number) {
    super(
      `The comment count ${count} is invalid, try setting it up as a positive integer, no longer than ${UPPER_COMMENTS_LIMIT}`,
      DomainErrorCode.COMMENTS_COUNT_INVALID
    );
  }
}
