import { DomainError } from "@/shared/error-handling/domain/DomainError";
import { DomainErrorCode } from "@/shared/error-handling/domain/DomainErrorCode";

export class ProposalTitleIsEmptyError extends DomainError {
    constructor() {
      super(`Proposal title is empty`, DomainErrorCode.PROPOSAL_TITLE_EMPTY)
    }
}