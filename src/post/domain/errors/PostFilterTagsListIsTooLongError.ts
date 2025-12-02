import { SEARCH_POSTS_TAGS_UPPER_LIMIT } from "@/config/domain/Consts";
import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostFilterTagsListIsTooLongError extends DomainError {
  constructor() {
    super(
      `Post filter tags list is too long. It must be a list with a max of ${SEARCH_POSTS_TAGS_UPPER_LIMIT}`,
      DomainErrorCode.SEARCH_POSTS_TAGS_LIST_TOO_LONG
    );
  }
}
