import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class DraftTitleIsEmptyError extends DomainError {
  constructor() {
    super("Post title  is empty", DomainErrorCode.DRAFT_TITLE_IS_EMPTY);
  }
}
