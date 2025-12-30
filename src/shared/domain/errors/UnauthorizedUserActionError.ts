import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class UnauthorizedUserActionError extends DomainError {
  constructor() {
    super(
      "You are not authorized to execute this action",
      DomainErrorCode.UNATHORIZED_USER_ACTION
    );
  }
}
