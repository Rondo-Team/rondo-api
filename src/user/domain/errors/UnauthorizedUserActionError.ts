import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class UnauthorizedUserActionError extends DomainError {
  constructor() {
    super(
      "You are not authorized to execute this action on other users",
      DomainErrorCode.UNATHORIZED_USER_ACTION
    );
  }
}
