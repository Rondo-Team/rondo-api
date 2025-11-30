import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalDescriptionIsTooLongError extends DomainError {
  constructor() {
    super('Proposal description is too long', DomainErrorCode.PROPOSAL_DESCRIPTION_TOO_LONG)
  }
}