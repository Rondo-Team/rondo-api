import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalNotFoundByIdError extends DomainError {
  constructor(id: string) {
    super(
      `Proposal with id ${id} was not found`,
      DomainErrorCode.PROPOSAL_NOT_FOUND_BY_ID
    );
  }
}
