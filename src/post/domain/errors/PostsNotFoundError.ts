import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostsNotFoundError extends DomainError {
  constructor() {
    super("Could not retrieve any post", DomainErrorCode.POSTS_NOT_FOUND);
  }
}
