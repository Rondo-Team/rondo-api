import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ReplyProposalHistoryEntrieMessageContainsForbiddenCharsError extends DomainError {
  constructor() {
    super(
      "Proposal reply has forbidden characters",
      DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_HAS_FORBIDDEN_CHARS
    );
  }
}
