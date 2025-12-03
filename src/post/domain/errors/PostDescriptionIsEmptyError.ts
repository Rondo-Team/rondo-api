import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostDescriptionIsEmptyError extends DomainError {
  constructor() {
    super(
      "Post descriptio  is empty",
      DomainErrorCode.POST_DESCRIPTION_IS_EMPTY
    );
  }
}
