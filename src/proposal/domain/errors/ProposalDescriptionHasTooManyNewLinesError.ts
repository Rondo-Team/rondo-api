import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalDescriptionHasTooManyNewLinesError extends DomainError {
  constructor() {
    super(
      "Proposal description has too many new lines",
      DomainErrorCode.PROPOSAL_DESCRIPTION_HAS_TOO_MANY_NEW_LINES
    );
  }
}
