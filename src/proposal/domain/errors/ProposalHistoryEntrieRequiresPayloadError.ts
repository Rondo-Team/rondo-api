import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalHistoryEntrieRequiresPayloadError extends DomainError {
  constructor(intent: string) {
    super(
      `Proposal history entrie ${intent} requires to be sent a payload`,
      DomainErrorCode.PROPOSAL_HISTORY_ENTRIE_REQUIRES_PAYLOAD_ERROR,
    );
  }
}
