import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UsernameAndNewUsernameAreEqualError extends DomainError {
  constructor(username: string) {
    super(`New username: ${username} is equal to user current username`, DomainErrorCode.USERNAME_AND_NEW_USERNAME_ARE_EQUAL)
  }
}