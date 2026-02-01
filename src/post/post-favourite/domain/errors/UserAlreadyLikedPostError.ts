import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UserAlreadyLikedPostError extends DomainError {
  constructor(userId: string, postId: string) {
    super(
      `User with id ${userId} has already like post with id ${postId}`,
      DomainErrorCode.USER_ALREADY_LIKED_POST_ERROR
    );
  }
}
