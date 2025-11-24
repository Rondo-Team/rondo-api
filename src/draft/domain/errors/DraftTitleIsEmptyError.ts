import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftTitleIsEmptyError extends DomainError {
  constructor() {
    super("Post title  is empty", DomainErrorCode.DRAFT_TITLE_IS_EMPTY);
  }
}
