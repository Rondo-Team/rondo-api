import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class CreationDateInvalidError extends DomainError {
  constructor(date: Date) {
    super(
      `The user creation date: ${date} is invalid`,
      DomainErrorCode.CREATION_DATE_INVALID
    );
  }
}
