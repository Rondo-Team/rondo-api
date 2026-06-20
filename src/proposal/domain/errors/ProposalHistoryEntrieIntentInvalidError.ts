import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalHistoryEntrieIntentInvalidError extends DomainError {
  constructor(value: string) {
    super(
      `Proposal history entrie intent ${value} is not supported by the system`,
      DomainErrorCode.PROPOSAL_HISTORY_ENTRIE_INTENT_INVALID_ERROR,
    );
  }
}
