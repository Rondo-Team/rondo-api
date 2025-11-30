import {
  PROPOSAL_TITLE_CHAR_LOWER_LIMIT,
  PROPOSAL_TITLE_CHAR_UPPER_LIMIT,
  PROPOSAL_TITLE_MAX_NEW_LINES
} from "@/config";
import { TextValue } from "@/shared/domain/value-objects/TextValue";
import { ProposalTitleContainsForbiddenCharsError } from "../errors/ProposalTitleContainsForbiddenCharsError";
import { ProposalTitleHasTooManyNewLinesError } from "../errors/ProposalTitleHasTooManyNewLinesError";
import { ProposalTitleIsEmptyError } from "../errors/ProposalTitleIsEmptyError";
import { ProposalTitleIsTooLongError } from "../errors/ProposalTitleIsTooLongError";
import { ProposalTitleIsTooShortError } from "../errors/ProposalTitleIsTooShortError";

export class ProposalTitle extends TextValue {
  constructor(private value: string) {
    super(value);
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
}
