import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CreationDateInvalidError extends DomainError {
  constructor(date: Date) {
    super(
      `The user creation date: ${date} is invalid`,
      DomainErrorCode.CREATION_DATE_INVALID
    );
  }
}
