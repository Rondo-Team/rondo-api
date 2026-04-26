import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../../shared/error-handling/domain/DomainErrorCode.ts";

export class LikeWithUserAndPostNotFoundError extends DomainError {
  constructor(userId: string, postId: string) {
    super(
      `Like with user with id ${userId} and post ${postId} not found`,
      DomainErrorCode.LIKE_WITH_USER_AND_POST_NOT_FOUND,
    );
  }
}
