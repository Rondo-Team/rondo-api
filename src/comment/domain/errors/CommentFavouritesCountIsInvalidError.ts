import { COMMENT_FAVOURITES_UPPER_LIMIT } from "@/config/domain/Consts";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentFavouritesCountIsInvalidError extends DomainError {
  constructor(favouritesCount: number) {
    super(
      `Comment favourites count: ${favouritesCount} is invalid, try setting it up as a positive integer, no longer than ${COMMENT_FAVOURITES_UPPER_LIMIT}`,
      DomainErrorCode.COMMENT_FAVOURITES_COUNT_INVALID
    );
  }
}
