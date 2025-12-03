import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalDescriptionIsEmptyError extends DomainError {
  constructor() {
    super(
      "Proposal description is empty",
      DomainErrorCode.PROPOSAL_DESCRIPTION_IS_EMPTY
    );
  }
}
