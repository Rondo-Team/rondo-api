import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalTitleContainsForbiddenCharsError extends DomainError {
  constructor() {
    super(
      `Proposal title contains forbidden chars`,
      DomainErrorCode.PROPOSAL_TITLE_CONTAINS_FORBIDDEN_CHARS
    );
  }
}
