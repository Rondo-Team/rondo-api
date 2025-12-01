import { REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_LOWER_LIMIT, REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_MAX_NEW_LINES, REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_UPPER_LIMIT } from "@/config";
import { TextValue } from "@/shared/domain/value-objects/TextValue";
import { ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError } from "../errors/ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError";
import { ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError } from "../errors/ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError";
import { ReplyProposalHistoryEntrieMessageIsEmptyError } from "../errors/ReplyProposalHistoryEntrieMessageIsEmptyError";
import { ReplyProposalHistoryEntrieMessageIsTooLongError } from "../errors/ReplyProposalHistoryEntrieMessageIsTooLongError";
import { ReplyProposalHistoryEntrieMessageIsTooShortError } from "../errors/ReplyProposalHistoryEntrieMessageIsTooShortError";

export class ReplyProposalHistoryEntrieMessage extends TextValue {
  constructor(readonly value: string) {
    super(value);
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
    return this.value
  }
}