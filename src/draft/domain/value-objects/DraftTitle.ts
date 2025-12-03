import {
  DRAFT_TITLE_CHAR_LOWER_LIMIT,
  DRAFT_TITLE_CHAR_UPPER_LIMIT,
  DRAFT_TITLE_MAX_NEW_LINES,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { DraftTitleContainsForbiddenCharsError } from "../errors/DraftTitleContainsForbiddenCharsError.ts";
import { DraftTitleHasTooManyNewLinesError } from "../errors/DraftTitleHasTooManyNewLinesError.ts";
import { DraftTitleIsEmptyError } from "../errors/DraftTitleIsEmptyError.ts";
import { DraftTitleIsTooLongError } from "../errors/DraftTitleIsTooLongError.ts";
import { DraftTitleIsTooShortError } from "../errors/DraftTitleIsTooShortError.ts";

export class DraftTitle extends TextValue {
  constructor(readonly value: string) {
    super(value);
  }

  protected maxLength() {
    return DRAFT_TITLE_CHAR_UPPER_LIMIT;
  }

  protected minLength() {
    return DRAFT_TITLE_CHAR_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return DRAFT_TITLE_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new DraftTitleIsTooLongError(this.value);
  }

  protected tooShortError() {
    return new DraftTitleIsTooShortError(this.value);
  }

  protected tooManyNewLinesError() {
    return new DraftTitleHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new DraftTitleIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new DraftTitleContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }
}
