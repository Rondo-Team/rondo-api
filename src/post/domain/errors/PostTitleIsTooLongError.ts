import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostTitleIsTooLongError extends DomainError {
  constructor(title: string) {
    super(
      `Post title: ${title} is too long`,
      DomainErrorCode.POST_TITLE_TOO_LONG
    );
  }
}
