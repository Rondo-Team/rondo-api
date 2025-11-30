import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ReplyProposalHistoryEntrieMessageIsTooShortError extends DomainError {
  constructor() {
    super('Proposal reply is too short', DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_TOO_SHORT)
  }
}