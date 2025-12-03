import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class DraftDescriptionIsEmptyError extends DomainError {
  constructor() {
    super(
      "Draft description  is empty",
      DomainErrorCode.DRAFT_DESCRIPTION_IS_EMPTY
    );
  }
}
