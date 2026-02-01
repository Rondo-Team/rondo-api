import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class DraftTitleIsTooShortError extends DomainError {
  constructor(title: string) {
    super(
      `Draft title: ${title} is too short`,
      DomainErrorCode.DRAFT_TITLE_TOO_SHORT
    );
  }
}
