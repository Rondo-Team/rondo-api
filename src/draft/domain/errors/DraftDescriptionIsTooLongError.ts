import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class DraftDescriptionIsTooLongError extends DomainError {
  constructor() {
    super(
      `Draft description is too long`,
      DomainErrorCode.DRAFT_DESCRIPTION_TOO_LONG
    );
  }
}
