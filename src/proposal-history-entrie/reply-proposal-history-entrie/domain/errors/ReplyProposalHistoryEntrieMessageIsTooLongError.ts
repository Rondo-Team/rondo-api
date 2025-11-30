import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ReplyProposalHistoryEntrieMessageIsTooLongError extends DomainError {
  constructor() {
    super('Proposal reply is too long', DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_TOO_LONG)
  }
}