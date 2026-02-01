import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostTitleIsEmptyError extends DomainError {
  constructor() {
    super("Post title  is empty", DomainErrorCode.POST_TITLE_IS_EMPTY);
  }
}
