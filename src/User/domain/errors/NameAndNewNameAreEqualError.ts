import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class NameAndNewNameAreEqualError extends DomainError {
  constructor(name: string) {
    super(`New name: ${name} is equal to user current email`, DomainErrorCode.NAME_AND_NEW_NAME_ARE_EQUAL)
  }
}