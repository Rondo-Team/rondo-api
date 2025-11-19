import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UserEmailIsInvalidError extends DomainError {
  constructor(email: string) {
    super(`Email: ${email} is not a valid email`, DomainErrorCode.USER_EMAIL_IS_INVALID)
  }
}