import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostFilterCreationDateInvalidError extends DomainError {
  constructor(date: Date) {
    super(
      `The post filter minimum creation date: ${date} is invalid`,
      DomainErrorCode.SEARCH_POSTS_MIN_CREATION_DATE_INVALID
    );
  }
}
