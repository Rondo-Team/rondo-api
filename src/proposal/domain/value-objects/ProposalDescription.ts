import {
  PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT,
  PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT,
  PROPOSAL_DESCRIPTION_MAX_NEW_LINES,
} from "../../../config/domain/Consts.ts";
import { TextValue } from "../../../shared/domain/value-objects/TextValue.ts";
import { ProposalDescriptionContainsForbiddenCharsError } from "../errors/ProposalDescriptionContainsForbiddenCharsError.ts";
import { ProposalDescriptionHasTooManyNewLinesError } from "../errors/ProposalDescriptionHasTooManyNewLinesError.ts";
import { ProposalDescriptionIsEmptyError } from "../errors/ProposalDescriptionIsEmptyError.ts";
import { ProposalDescriptionIsTooLongError } from "../errors/ProposalDescriptionIsTooLongError.ts";
import { ProposalDescriptionIsTooShortError } from "../errors/ProposalDescriptionIsTooShortError.ts";

export class ProposalDescription extends TextValue {
  constructor(readonly value: string) {
    super(value);
  }

  protected maxLength() {
    return PROPOSAL_DESCRIPTION_CHAR_UPPER_LIMIT;
  }

  protected minLength() {
    return PROPOSAL_DESCRIPTION_CHAR_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return PROPOSAL_DESCRIPTION_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new ProposalDescriptionIsTooLongError();
  }

  protected tooShortError() {
    return new ProposalDescriptionIsTooShortError();
  }

  protected tooManyNewLinesError() {
    return new ProposalDescriptionHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new ProposalDescriptionIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new ProposalDescriptionContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }
}
