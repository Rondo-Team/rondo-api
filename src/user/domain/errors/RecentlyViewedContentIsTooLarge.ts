import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class RecentlyViewedContentIsTooLargeError extends DomainError {
  constructor() {
    super(
      `Recently viewed content list is too large`,
      DomainErrorCode.RECENTLY_VIEWED_CONTENT_IS_TOO_LARGE,
    );
  }
}
