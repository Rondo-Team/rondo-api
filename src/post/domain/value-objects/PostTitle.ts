import {
  POST_TITLE_CHAR_LOWER_LIMIT,
  POST_TITLE_CHAR_UPPER_LIMIT,
  POST_TITLE_MAX_NEW_LINES,
} from "@/config/domain/Consts";
import { TextValue } from "@/shared/domain/value-objects/TextValue";
import { PostTitleContainsForbiddenCharsError } from "../errors/PostTitleContainsForbiddenCharsError";
import { PostTitleHasTooManyNewLinesError } from "../errors/PostTitleHasTooManyNewLinesError";
import { PostTitleIsEmptyError } from "../errors/PostTitleIsEmptyError";
import { PostTitleIsTooLongError } from "../errors/PostTitleIsTooLongError";
import { PostTitleIsTooShortError } from "../errors/PostTitleIsTooShortError";

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
