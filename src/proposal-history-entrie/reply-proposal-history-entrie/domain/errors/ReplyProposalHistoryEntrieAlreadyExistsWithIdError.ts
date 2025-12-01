import { DomainError } from "@/shared/error-handling/domain/DomainError";

export class ReplyProposalHistoryEntrieAlreadyExistsWithIdError extends DomainError {
  constructor(id: string) {
    super(`Reply with id ${id} already exists`, DomainErrorCode.REPLY_PROPOSAL_HISTORY_ENTRIE_ALREADY_EXISTS_WITH_ID)
  }
}