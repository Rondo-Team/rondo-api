import {
  COMMENT_MESSAGE_LOWER_LIMIT,
  COMMENT_MESSAGE_MAX_NEW_LINES,
  COMMENT_MESSAGE_UPPER_LIMIT,
} from "@/config";
import { TextValue } from "@/shared/domain/value-objects/TextValue";
import { CommentMessageContainsForbiddenCharsError } from "../errors/CommentMessageContainsForbiddenCharsError";
import { CommentMessageHasTooManyNewLinesError } from "../errors/CommentMessageHasTooManyNewLinesError";
import { CommentMessageIsEmptyError } from "../errors/CommentMessageIsEmptyError";
import { CommentMessageIsTooLongError } from "../errors/CommentMessageIsTooLongError";
import { CommentMessageIsTooShortError } from "../errors/CommentMessageIsToShortError";

export class CommentMessage extends TextValue {  
  constructor(public value: string) {
    super(value);
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
    return this.value
  }
}
