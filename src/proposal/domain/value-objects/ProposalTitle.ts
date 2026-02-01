import {
  PROPOSAL_TITLE_CHAR_LOWER_LIMIT,
  PROPOSAL_TITLE_CHAR_UPPER_LIMIT,
  PROPOSAL_TITLE_MAX_NEW_LINES,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { ProposalTitleContainsForbiddenCharsError } from "../errors/ProposalTitleContainsForbiddenCharsError.ts";
import { ProposalTitleHasTooManyNewLinesError } from "../errors/ProposalTitleHasTooManyNewLinesError.ts";
import { ProposalTitleIsEmptyError } from "../errors/ProposalTitleIsEmptyError.ts";
import { ProposalTitleIsTooLongError } from "../errors/ProposalTitleIsTooLongError.ts";
import { ProposalTitleIsTooShortError } from "../errors/ProposalTitleIsTooShortError.ts";

export class ProposalTitle extends TextValue {
  readonly value: string;
  constructor(value: string) {
    super(value);
    this.value = value;
  }

  protected maxLength() {
    return PROPOSAL_TITLE_CHAR_UPPER_LIMIT;
  }

  protected minLength() {
    return PROPOSAL_TITLE_CHAR_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return PROPOSAL_TITLE_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new ProposalTitleIsTooLongError(this.value);
  }

  protected tooShortError() {
    return new ProposalTitleIsTooShortError(this.value);
  }

  protected tooManyNewLinesError() {
    return new ProposalTitleHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new ProposalTitleIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new ProposalTitleContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }

  static fromPrimitives(value: string) {
    return new ProposalTitle(value);
  }
}
