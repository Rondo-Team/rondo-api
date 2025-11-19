import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UserNotFoundByEmailError extends DomainError {
  constructor(email: string) {
    super(`User with email: ${email} not found`, DomainErrorCode.USER_NOT_FOUND_BY_EMAIL)
  }
}