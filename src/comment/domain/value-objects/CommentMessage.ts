import {
  COMMENT_MESSAGE_LOWER_LIMIT,
  COMMENT_MESSAGE_MAX_NEW_LINES,
  COMMENT_MESSAGE_UPPER_LIMIT,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { CommentMessageContainsForbiddenCharsError } from "../errors/CommentMessageContainsForbiddenCharsError.ts";
import { CommentMessageHasTooManyNewLinesError } from "../errors/CommentMessageHasTooManyNewLinesError.ts";
import { CommentMessageIsEmptyError } from "../errors/CommentMessageIsEmptyError.ts";
import { CommentMessageIsTooLongError } from "../errors/CommentMessageIsTooLongError.ts";
import { CommentMessageIsTooShortError } from "../errors/CommentMessageIsToShortError.ts";

export class CommentMessage extends TextValue {
  readonly value: string;

  constructor(value: string) {
    super(value);
    this.value = value;
  }

  protected maxLength() {
    return COMMENT_MESSAGE_UPPER_LIMIT;
  }

  protected minLength() {
    return COMMENT_MESSAGE_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return COMMENT_MESSAGE_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new CommentMessageIsTooLongError();
  }

  protected tooShortError() {
    return new CommentMessageIsTooShortError();
  }

  protected tooManyNewLinesError() {
    return new CommentMessageHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new CommentMessageIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new CommentMessageContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }
}
