import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class DraftDescriptionIsEmptyError extends DomainError {
  constructor() {
    super('Draft description  is empty', DomainErrorCode.DRAFT_DESCRIPTION_IS_EMPTY)
  }
}