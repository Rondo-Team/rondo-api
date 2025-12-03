import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostDescriptionContainsForbiddenCharsError extends DomainError {
  constructor() {
    super(
      "Post description contanis forbidden chars",
      DomainErrorCode.POST_DESCRIPTION_HAS_FORBIDDEN_CHARS
    );
  }
}
