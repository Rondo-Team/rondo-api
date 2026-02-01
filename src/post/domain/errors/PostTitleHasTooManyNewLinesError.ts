import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostTitleHasTooManyNewLinesError extends DomainError {
  constructor() {
    super(
      "Post title has too many new lines",
      DomainErrorCode.POST_TITLE_HAS_TOO_MANY_NEW_LINES
    );
  }
}
