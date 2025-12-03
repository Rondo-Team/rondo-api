import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class CommentWithIdAlreadyExistsError extends DomainError {
  constructor(id: string) {
    super(
      `Comment with id: ${id} already exists`,
      DomainErrorCode.COMMENT_WITH_ID_ALREADY_EXISTS
    );
  }
}
