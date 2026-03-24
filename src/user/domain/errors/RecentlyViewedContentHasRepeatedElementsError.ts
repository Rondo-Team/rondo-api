import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class RecentlyViewedContentHasRepeatedElementsError extends DomainError {
  constructor() {
    super(
      `Recently viewed list has repeated elements`,
      DomainErrorCode.RECENTLY_VIEWED_CONTENT_HAS_REPEATED_ELEMENTS,
    );
  }
}
