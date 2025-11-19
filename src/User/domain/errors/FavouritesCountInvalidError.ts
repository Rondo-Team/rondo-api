import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";
import { UPPER_FAVOURITES_LIMIT } from "@/config";

export class FavouritesCountInvalidError extends DomainError {
  constructor(count: number) {
    super(
      `The comment count ${count} is invalid, try setting it up as a positive integer, no longer than ${UPPER_FAVOURITES_LIMIT}`,
      DomainErrorCode.COMMENTS_COUNT_INVALID
    );
  }
}