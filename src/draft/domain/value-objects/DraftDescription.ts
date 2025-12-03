import {
  DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT,
  DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT,
  DRAFT_DESCRIPTION_MAX_NEW_LINES,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { DraftDescriptionContainsForbiddenCharsError } from "../errors/DraftDescriptionContainsForbiddenCharsError.ts";
import { DraftDescriptionHasTooManyNewLinesError } from "../errors/DraftDescriptionHasTooManyNewLinesError.ts";
import { DraftDescriptionIsEmptyError } from "../errors/DraftDescriptionIsEmptyError.ts";
import { DraftDescriptionIsTooLongError } from "../errors/DraftDescriptionIsTooLongError.ts";
import { DraftDescriptionIsTooShortError } from "../errors/DraftDescriptionIsTooShortError.ts";

export class DraftDescription extends TextValue {
  constructor(readonly value: string) {
    super(value);
  }

  protected maxLength() {
    return DRAFT_DESCRIPTION_CHAR_UPPER_LIMIT;
  }

  protected minLength() {
    return DRAFT_DESCRIPTION_CHAR_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return DRAFT_DESCRIPTION_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new DraftDescriptionIsTooLongError();
  }

  protected tooShortError() {
    return new DraftDescriptionIsTooShortError();
  }

  protected tooManyNewLinesError() {
    return new DraftDescriptionHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new DraftDescriptionIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new DraftDescriptionContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }
}
