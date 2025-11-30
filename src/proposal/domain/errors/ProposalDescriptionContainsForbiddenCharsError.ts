import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalDescriptionContainsForbiddenCharsError extends DomainError {
  constructor() {
    super('Proposal description contains forbidden chars', DomainErrorCode.PROPOSAL_DESCRIPTION_CONTAINS_FORBIDDEN_CHARS)
  }
}