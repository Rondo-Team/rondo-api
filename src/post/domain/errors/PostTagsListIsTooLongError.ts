import { POST_TAGS_UPPER_LIMIT } from "../../../config/domain/Consts.ts";
import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class PostTagsListIsTooLongError extends DomainError {
  constructor() {
    super(
      `The tag list provided has too many elements, try with a list with no more than ${POST_TAGS_UPPER_LIMIT}`,
      DomainErrorCode.POST_TAGS_LIST_TOO_LONG
    );
  }
}
