import { DomainError } from "../../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ActivityProposalHistoryEntrieAlreadyExistsWithIdError extends DomainError {
  constructor(id: string) {
    super(
      `Activity with id ${id} already exists`,
      DomainErrorCode.ACTIVITY_PROPOSAL_HISTORY_ENTRIE_ALREADY_EXISTS_WITH_ID
    );
  }
}
