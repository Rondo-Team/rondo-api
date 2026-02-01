import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostDescriptionIsTooShortError extends DomainError {
  constructor() {
    super(
      `Post description is too short`,
      DomainErrorCode.POST_DESCRIPTION_TOO_SHORT
    );
  }
}
