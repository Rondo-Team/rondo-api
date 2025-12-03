import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostTagsListHasRepeatedElementsError extends DomainError {
  constructor() {
    super(
      "Post tags list has a repeated element",
      DomainErrorCode.POST_TAGS_LIST_HAS_REPEATED_ELEMENT
    );
  }
}
