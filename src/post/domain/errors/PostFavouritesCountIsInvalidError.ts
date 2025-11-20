import { POST_FAVOURITES_UPPER_LIMIT } from "@/config";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostFavouritesCountIsInvalidError extends DomainError {
  constructor(favouritesCount: number) {
    super(
      `Post favourites count: ${favouritesCount} is invalid, try setting it up as a positive integer, no longer than ${POST_FAVOURITES_UPPER_LIMIT}`,
      DomainErrorCode.POST_FAVOURITES_COUNT_INVALID
    );
  }
}
