import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class PostTagIsInvalidError extends DomainError {
  constructor(tag: string) {
    super(`Post tag: ${tag} is invalid`, DomainErrorCode.POST_TAG_INVALID)
  }
}