import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ReplyProposalHistoryEntrieMessageHasTooManyNewLinesError extends DomainError {
  constructor() {
    super('Proposal reply has too many new lines', DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_HAS_TOO_MANY_NEW_LINES)
  }
}