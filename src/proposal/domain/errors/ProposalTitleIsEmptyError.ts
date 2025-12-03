import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalTitleIsEmptyError extends DomainError {
  constructor() {
    super(`Proposal title is empty`, DomainErrorCode.PROPOSAL_TITLE_EMPTY);
  }
}
