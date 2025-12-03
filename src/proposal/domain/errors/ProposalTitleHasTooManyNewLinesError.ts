import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalTitleHasTooManyNewLinesError extends DomainError {
  constructor() {
    super(
      `Proposal title has too many new lines`,
      DomainErrorCode.PROPOSAL_TITLE_HAS_TOO_MANY_NEW_LINES
    );
  }
}
