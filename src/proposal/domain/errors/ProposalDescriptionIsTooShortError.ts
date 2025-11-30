import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalDescriptionIsTooShortError extends DomainError {
  constructor() {
    super('Proposal description is too short', DomainErrorCode.PROPOSAL_DESCRIPTION_TOO_SHORT)
  }
}