import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalStatusIsInvalidError extends DomainError {
  constructor(status: string) {
    super(
      `Proposal status ${status} is invalid.`,
      DomainErrorCode.PROPOSAL_STATUS_IS_INVALID,
    );
  }
}
