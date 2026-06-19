import { DomainError } from "../../../shared/error-handling/domain/DomainError.ts";
import { DomainErrorCode } from "../../../shared/error-handling/domain/DomainErrorCode.ts";

export class ProposalIsAlreadyClosedError extends DomainError {
  constructor(id: string) {
    super(
      `Proposal ${id} is already closed, so you cannot accept or decline its changes`,
      DomainErrorCode.PROPOSAL_IS_ALREADY_CLOSED,
    );
  }
}
