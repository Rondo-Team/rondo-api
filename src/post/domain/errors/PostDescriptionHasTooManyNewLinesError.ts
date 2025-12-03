import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostDescriptionHasTooManyNewLinesError extends DomainError {
  constructor() {
    super(
      "Post description has too many new lines",
      DomainErrorCode.POST_DESCRIPTION_HAS_TOO_MANY_NEW_LINES
    );
  }
}
