import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class DraftDescriptionIsTooShortError extends DomainError {
  constructor() {
    super(
      `Draft description is too short`,
      DomainErrorCode.DRAFT_DESCRIPTION_TOO_SHORT
    );
  }
}
