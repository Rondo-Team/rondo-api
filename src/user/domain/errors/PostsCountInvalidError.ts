import { UPPER_POSTS_LIMIT } from "@/config/domain/Consts";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostsCountInvalidError extends DomainError {
  constructor(count: number) {
    super(
      `The post count ${count} is invalid, try setting it up as a positive integer, no longer than ${UPPER_POSTS_LIMIT}`,
      DomainErrorCode.POSTS_COUNT_INVALID
    );
  }
}
