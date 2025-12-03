import { SEARCH_POSTS_MIN_FAVOURITES_UPPER_LIMIT } from "@/config/domain/Consts";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostFilterMinFavouritesIsIvalidError extends DomainError {
  constructor(minFavourites: number) {
    super(
      `Post favourites count: ${minFavourites} is invalid, try setting it up as a positive integer, no longer than ${SEARCH_POSTS_MIN_FAVOURITES_UPPER_LIMIT}`,
      DomainErrorCode.SEARCH_POSTS_MIN_FAVOURITES_COUNT
    );
  }
}
