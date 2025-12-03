import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostTitleIsTooShortError extends DomainError {
  constructor(title: string) {
    super(
      `Post title: ${title} is too short`,
      DomainErrorCode.POST_TITLE_TOO_SHORT
    );
  }
}
