import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostFilterTagsListHasRepeatedElementsError extends DomainError {
  constructor() {
    super(`Post filter tags list has repeated elements, please remove them`, DomainErrorCode.SEARCH_POSTS_TAGS_LIST_HAS_REPEATED_ELEMENTS)
  }
}