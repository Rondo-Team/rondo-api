import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UserUsernameIsTooShortError extends DomainError {
  constructor(username: string) {
    super(`Username: ${username} is too short`, DomainErrorCode.USERNAME_IS_TOO_SHORT);
  }
}