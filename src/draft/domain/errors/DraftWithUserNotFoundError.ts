import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class DraftWithUserNotFoundError extends DomainError {
  constructor(id: string) {
    super(
      `Draft is associated to user with id: ${id} which could not be found`,
      DomainErrorCode.DRAFT_WITH_USER_NOT_FOUND
    );
  }
}
