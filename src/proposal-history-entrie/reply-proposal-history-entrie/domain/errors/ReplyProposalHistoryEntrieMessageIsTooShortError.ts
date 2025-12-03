import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ReplyProposalHistoryEntrieMessageIsTooShortError extends DomainError {
  constructor() {
    super(
      "Proposal reply is too short",
      DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_TOO_SHORT
    );
  }
}
