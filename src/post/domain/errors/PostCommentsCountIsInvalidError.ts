import { POST_COMMENTS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostCommentsCountIsInvalidError extends DomainError {
  constructor(commentsCount: number) {
    super(
      `Post favourites count: ${commentsCount} is invalid, try setting it up as a positive integer, no longer than ${POST_COMMENTS_UPPER_LIMIT}`,
      DomainErrorCode.POST_COMMENTS_COUNT_INVALID
    );
  }
}
