import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class CommentNotFoundByIdError extends DomainError {
  constructor (id: string) {
    super(`Comment with id: ${id} was not found`, DomainErrorCode.COMMENT_NOT_FOUND_BY_ID)
  }
}