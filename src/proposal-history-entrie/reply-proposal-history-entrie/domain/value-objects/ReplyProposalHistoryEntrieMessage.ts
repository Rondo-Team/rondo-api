import {
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT,
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_MAX_NEW_LINES,
  REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT,
} from "../../../../config/domain/Consts.ts";
import { TextValue } from "../../../../shared/domain/value-objects/TextValue.ts";
import { ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError } from "../errors/ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError.ts";
import { ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError } from "../errors/ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError.ts";
import { ReplyProposalHistoryEntrieMessageIsEmptyError } from "../errors/ReplyProposalHistoryEntrieMessageIsEmptyError.ts";
import { ReplyProposalHistoryEntrieMessageIsTooLongError } from "../errors/ReplyProposalHistoryEntrieMessageIsTooLongError.ts";
import { ReplyProposalHistoryEntrieMessageIsTooShortError } from "../errors/ReplyProposalHistoryEntrieMessageIsTooShortError.ts";

export class ReplyProposalHistoryEntrieMessage extends TextValue {
  readonly value: string;
  constructor(value: string) {
    super(value);
    this.value = value;
  }

  protected maxLength() {
    return REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT;
  }

  protected minLength() {
    return REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT;
  }

  protected maxNewLines() {
    return REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_MAX_NEW_LINES;
  }

  protected tooLongError() {
    return new ReplyProposalHistoryEntrieMessageIsTooLongError();
  }

  protected tooShortError() {
    return new ReplyProposalHistoryEntrieMessageIsTooShortError();
  }

  protected tooManyNewLinesError() {
    return new ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError();
  }

  protected emptyError() {
    return new ReplyProposalHistoryEntrieMessageIsEmptyError();
  }

  protected forbiddenCharsError() {
    return new ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError();
  }

  toPrimitives() {
    return this.value;
  }
}
