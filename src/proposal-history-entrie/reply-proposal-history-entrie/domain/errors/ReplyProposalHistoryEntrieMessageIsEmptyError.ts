import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ReplyProposalHistoryEntrieMessageIsEmptyError extends DomainError {
  constructor() {
    super('Proposal reply is empty', DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_MESSAGE_IS_EMPTY)
  }
}