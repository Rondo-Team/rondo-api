import { DomainError } from "../../error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../error-handling/domain/DomainErrorCode.ts";

export class IdIsNotValidError extends DomainError {
  constructor(id: string) {
    super(
      `Id: ${id} is not long enough, minimun length is 5 characters`,
      DomainErrorCode.ID_NOT_VALID
    );
  }
}
