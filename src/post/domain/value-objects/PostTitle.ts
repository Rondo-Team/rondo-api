import {
  POST_TITLE_CHAR_LOWER_LIMIT,
  POST_TITLE_CHAR_UPPER_LIMIT,
  POST_TITLE_MAX_NEW_LINES,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { PostTitleContainsForbiddenCharsError } from "../errors/PostTitleContainsForbiddenCharsError.ts";
import { PostTitleHasTooManyNewLinesError } from "../errors/PostTitleHasTooManyNewLinesError.ts";
import { PostTitleIsEmptyError } from "../errors/PostTitleIsEmptyError.ts";
import { PostTitleIsTooLongError } from "../errors/PostTitleIsTooLongError.ts";
import { PostTitleIsTooShortError } from "../errors/PostTitleIsTooShortError.ts";

export class PostTitle extends TextValue {
  constructor(readonly value: string) {
    super(value);
  }

  protected maxLength() {
    return POST_TITLE_CHAR_UPPER_LIMIT;
  }

  protected minLength() {
    return POST_TITLE_CHAR_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return POST_TITLE_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new PostTitleIsTooLongError(this.value);
  }

  protected tooShortError() {
    return new PostTitleIsTooShortError(this.value);
  }

  protected tooManyNewLinesError() {
    return new PostTitleHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new PostTitleIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new PostTitleContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }
}
