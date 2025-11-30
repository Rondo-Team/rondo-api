import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalNotFoundByIdError extends DomainError {
  constructor(id: string) {
    super(`Proposal with id ${id} was not found`, DomainErrorCode.PROPOSAL_NOT_FOUND_BY_ID)
  }
}