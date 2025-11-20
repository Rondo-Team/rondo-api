import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostNotFoundByIdError extends DomainError{
  constructor(id: string) {
    super(`Post with id: ${id} was not found`, DomainErrorCode.POST_NOT_FOUND)
  }
}