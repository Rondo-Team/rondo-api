import { DomainError } from "../../../shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode";

export class EmailAndNewEmailAreEqualError extends DomainError {
  constructor(email: string) {
    super(`New email: ${email} is equal to user current email`, DomainErrorCode.EMAIL_AND_NEW_EMAIL_ARE_EQUAL)
  }
}