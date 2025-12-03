import {
  POST_DESCRIPTION_CHAR_LOWER_LIMIT,
  POST_DESCRIPTION_CHAR_UPPER_LIMIT,
  POST_DESCRIPTION_MAX_NEW_LINES,
} from "@/config/domain/Consts";
import { TextValue } from "@/shared/domain/value-objects/TextValue";
import { PostDescriptionContainsForbiddenCharsError } from "../errors/PostDescriptionContainsForbiddenCharsError";
import { PostDescriptionHasTooManyNewLinesError } from "../errors/PostDescriptionHasTooManyNewLinesError";
import { PostDescriptionIsEmptyError } from "../errors/PostDescriptionIsEmptyError";
import { PostDescriptionIsTooLongError } from "../errors/PostDescriptionIsTooLongError";
import { PostDescriptionIsTooShortError } from "../errors/PostDescriptionIsTooShortError";

export class PostDescription extends TextValue {
  constructor(readonly value: string) {
    super(value);
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
}
