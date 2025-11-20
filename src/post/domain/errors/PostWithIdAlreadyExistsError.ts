import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostWithIdAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(`Post with id: ${id} already exists`, DomainErrorCode.POST_WITH_ID_ALREADY_EXISTS)
  }
}