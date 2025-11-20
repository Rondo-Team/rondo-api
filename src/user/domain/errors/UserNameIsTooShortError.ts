import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class UserNameIsTooShortError extends DomainError {
  constructor(name: string) {
    super(`Name: ${name} is too short`, DomainErrorCode.USER_NAME_IS_TOO_SHORT);
  }
}