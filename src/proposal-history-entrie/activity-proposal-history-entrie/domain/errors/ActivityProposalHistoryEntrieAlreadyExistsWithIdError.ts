import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ActivityProposalHistoryEntrieAlreadyExistsWithIdError extends DomainError {
  constructor(id: string) {
    super(`Activity with id ${id} already exists`, DomainErrorCode.ACTIVITY_PROPOSAL_HISTORY_ENTRIE_ALREADY_EXISTS_WITH_ID)
  }
}