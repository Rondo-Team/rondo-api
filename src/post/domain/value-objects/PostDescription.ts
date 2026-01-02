import {
  POST_DESCRIPTION_CHAR_LOWER_LIMIT,
  POST_DESCRIPTION_CHAR_UPPER_LIMIT,
  POST_DESCRIPTION_MAX_NEW_LINES,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { PostDescriptionContainsForbiddenCharsError } from "../errors/PostDescriptionContainsForbiddenCharsError.ts";
import { PostDescriptionHasTooManyNewLinesError } from "../errors/PostDescriptionHasTooManyNewLinesError.ts";
import { PostDescriptionIsEmptyError } from "../errors/PostDescriptionIsEmptyError.ts";
import { PostDescriptionIsTooLongError } from "../errors/PostDescriptionIsTooLongError.ts";
import { PostDescriptionIsTooShortError } from "../errors/PostDescriptionIsTooShortError.ts";

export class PostDescription extends TextValue {
  readonly value: string;
  constructor(value: string) {
    super(value);
    this.value = value;
  }

  protected maxLength() {
    return POST_DESCRIPTION_CHAR_UPPER_LIMIT;
  }

  protected minLength() {
    return POST_DESCRIPTION_CHAR_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return POST_DESCRIPTION_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new PostDescriptionIsTooLongError();
  }

  protected tooShortError() {
    return new PostDescriptionIsTooShortError();
  }

  protected tooManyNewLinesError() {
    return new PostDescriptionHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new PostDescriptionIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new PostDescriptionContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: string) {
    return new PostDescription(value);
  }
}
