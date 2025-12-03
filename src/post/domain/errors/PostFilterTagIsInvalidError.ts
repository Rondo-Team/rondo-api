import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostFilterTagIsInvalidError extends DomainError {
  constructor(tag: string) {
    super(
      `Tag: ${tag} from tag list is not valid`,
      DomainErrorCode.SEARCH_POSTS_TAG_INVALID
    );
  }
}
