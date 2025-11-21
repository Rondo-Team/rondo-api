import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostDescriptionIsEmptyError extends DomainError {
  constructor() {
    super('Post descriptio  is empty', DomainErrorCode.POST_DESCRIPTION_IS_EMPTY)
  }
}